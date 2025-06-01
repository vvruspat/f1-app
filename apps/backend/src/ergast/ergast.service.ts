import { Injectable, type OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { AnyBulkWriteOperation, Model } from "mongoose";
import { SeasonModel } from "../db/schemas/season.schema";
import { SeasonResultsModel } from "../db/schemas/results.schema";
import type {
	Season,
	SeasonResultsErgastResponse,
	SeasonsErgastResponse,
} from "@repo/types";
import { $fetch } from "../utils/fetch";
// biome-ignore lint/style/useImportType: service should be imported in js bundle
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ErgastService implements OnApplicationBootstrap {
	private apiBase: string;

	constructor(
		@InjectModel(SeasonModel.name) private seasonModel: Model<SeasonModel>,
		@InjectModel(SeasonResultsModel.name)
		private resultsModel: Model<SeasonResultsModel>,
		private readonly configService: ConfigService,
	) {
		this.apiBase = this.configService.get<string>("ERGAST_API_BASE") ?? "";
	}

	async onApplicationBootstrap() {
		await this.syncSeasons();
	}

	fetchSeasonResults(season: string, limit = 100) {
		return $fetch<SeasonResultsErgastResponse>(
			`${this.apiBase}/${season}/results.json?limit=${limit}`,
		);
	}

	fetchSeasons(offset = 0, limit = 100) {
		return $fetch<SeasonsErgastResponse>(
			`${this.apiBase}/seasons.json?offset=${offset}&limit=${limit}`,
		);
	}

	async syncSeasons() {
		// 2024 is hardcoded because ergast API will not be updated anymore after 2024
		const seasonsInDb = await this.seasonModel
			.findOne({ season: "2024" })
			.lean();

		if (!seasonsInDb) {
			const response = await this.fetchSeasons();
			const seasons = response.MRData.SeasonTable.Seasons;

			await this.seasonModel.deleteMany({});
			await this.seasonModel.insertMany(seasons);

			await this.syncSeasonsResults(seasons);
		}
	}

	async syncSeasonsResults(seasons: Season[]) {
		await this.resultsModel.deleteMany({
			season: { $in: seasons.map((s) => s.season) },
		});

		const bulkOps: AnyBulkWriteOperation<SeasonResultsModel>[] = [];

		for (const season of seasons) {
			const resultsResponse = await this.fetchSeasonResults(
				season.season,
				1000,
			);
			bulkOps.push({
				insertOne: {
					document: {
						season: season.season,
						Races: resultsResponse.MRData.RaceTable.Races,
					},
				},
			});
		}

		// Perform bulk write operation for all missing seasons
		if (bulkOps.length > 0) {
			await this.resultsModel.bulkWrite(bulkOps);
		}
	}
}
