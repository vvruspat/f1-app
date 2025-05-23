import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SeasonResultsModel } from "../../db/schemas/results.schema";
import type { Model } from "mongoose";
import { calculateWinner } from "../../utils/calculateWinners";
import type { F1SeasonResults } from "@repo/types";

@Injectable()
export class SeasonResultsService {
	constructor(
		@InjectModel(SeasonResultsModel.name)
		private seasonResultsModel: Model<SeasonResultsModel>,
	) {}

	async getSeasonResults(season: string): Promise<F1SeasonResults> {
		const results = await this.seasonResultsModel.findOne({ season }).lean();

		if (!results || !results.season) {
			// TODO: Handle this case properly, need to return a 404
			throw new Error(`No results found for season: ${season}`);
		}

		return {
			...results,
			season: season,
			Winner: calculateWinner(results.Races ?? []),
		};
	}
}
