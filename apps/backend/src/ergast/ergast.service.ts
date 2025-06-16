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
import { delay } from "../utils/delay";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ErgastService implements OnApplicationBootstrap {
	private apiBase: string;
	private startSeason: string;

	constructor(
		@InjectModel(SeasonModel.name) private seasonModel: Model<SeasonModel>,
		@InjectModel(SeasonResultsModel.name)
		private resultsModel: Model<SeasonResultsModel>,
		private readonly configService: ConfigService,
	) {
		this.apiBase = this.configService.get<string>("ERGAST_API_BASE") ?? "";
		this.startSeason =
			this.configService.get<string>("ERGAST_START_SEASON") ?? "2005";
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
		const response = await this.fetchSeasons();
		const seasons = response.MRData.SeasonTable.Seasons;
		const currentYear = new Date().getFullYear();

		// Get all existing seasons from DB
		const existingSeasons = await this.seasonModel.find({}).lean();
		const existingSeasonYears = new Set(existingSeasons.map((s) => s.season));

		const existingSeasonsResults = await this.resultsModel
			.find({
				season: { $in: seasons.map((s) => s.season) },
			})
			.lean();

		const existingResultsSeasons = new Set(
			existingSeasonsResults.map((r) => r.season),
		);

		// Filter only seasons not in DB
		const newSeasons = seasons.filter(
			(s) =>
				!existingSeasonYears.has(s.season) ||
				!existingResultsSeasons.has(s.season) ||
				Number(s.season) === currentYear ||
				// Only sync seasons after 2005
				Number(s.season) > Number(this.startSeason),
		);

		if (newSeasons.length > 0) {
			await this.seasonModel.bulkWrite(
				newSeasons.map((season) => ({
					updateOne: {
						filter: { season: season.season },
						update: { $set: season },
						upsert: true,
					},
				})),
			);
			await this.syncSeasonsResults(newSeasons);
		}
	}

	async syncSeasonsResults(seasons: Season[]) {
		const existingResults = await this.resultsModel
			.find({
				season: { $in: seasons.map((s) => s.season) },
			})
			.lean();

		const existingResultsSeasons = new Set(
			existingResults.map((r) => r.season),
		);

		const bulkOps: AnyBulkWriteOperation<SeasonResultsModel>[] = [];
		const currentYear = new Date().getFullYear().toString();

		for (const season of seasons) {
			// Always update current year, skip others if already exist

			if (
				season.season !== currentYear &&
				existingResultsSeasons.has(season.season)
			) {
				continue;
			}

			const resultsResponse = await this.fetchSeasonResults(
				season.season,
				1000,
			);
			bulkOps.push({
				replaceOne: {
					filter: { season: season.season },
					replacement: {
						season: season.season,
						Races: resultsResponse.MRData.RaceTable.Races,
					},
					upsert: true,
				},
			});
			await delay(1000); // Respect rate limit
		}

		if (bulkOps.length > 0) {
			await this.resultsModel.bulkWrite(bulkOps);
		}
	}
}
