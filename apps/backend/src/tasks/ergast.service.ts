import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { SeasonModel } from "../db/schemas/season.schema";
import { SeasonResultsModel } from "../db/schemas/results.schema";
import type {
	Season,
	SeasonResultsErgastResponse,
	SeasonsErgastResponse,
} from "@repo/types";
import { $fetch } from "../utils/fetch";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ErgastService {
	private apiBase: string;

	constructor(
		@InjectModel(SeasonModel.name) private seasonModel: Model<SeasonModel>,
		@InjectModel(SeasonResultsModel.name)
		private resultsModel: Model<SeasonResultsModel>,
		private readonly configService: ConfigService,
	) {
		this.apiBase = this.configService.get<string>("ERGAST_API_BASE") ?? "";
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
		const seasonsInDb = await this.seasonModel.find().lean();
		const currentYear = new Date().getFullYear().toString();
		const hasCurrentSeason = seasonsInDb.some(
			(s: Season) => s.season === currentYear,
		);

		if (seasonsInDb.length === 0 || !hasCurrentSeason) {
			const response = await this.fetchSeasons(0, 1000);
			const seasons = response.MRData.SeasonTable.Seasons;

			await this.seasonModel.deleteMany({});
			await this.seasonModel.insertMany(seasons);

			return seasons;
		}

		return seasonsInDb;
	}

	async syncSeasonsResults() {
		const seasons = await this.seasonModel.find().lean();
		const currentYear = new Date().getFullYear().toString();

		for (const season of seasons) {
			const existing = await this.resultsModel.findOne({
				season: season.season,
			});
			// If results missing for previous seasons, fetch and save
			if (!existing && season.season !== currentYear) {
				const resultsResponse = await this.fetchSeasonResults(
					season.season,
					1000,
				);
				await this.resultsModel.create({
					season: season.season,
					Races: resultsResponse.MRData.RaceTable.Races,
				});
			}
		}

		// Always update results for current season
		const currentResultsResponse = await this.fetchSeasonResults(
			currentYear,
			1000,
		);
		await this.resultsModel.findOneAndUpdate(
			{ season: currentYear },
			{
				season: currentYear,
				Races: currentResultsResponse.MRData.RaceTable.Races,
			},
			{ upsert: true, new: true },
		);
	}
}
