import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SeasonResultsModel } from "../../db/schemas/results.schema";
import type { Model } from "mongoose";
import { calculateWinner } from "../../utils/calculateWinners";
import type { APIResponse, F1SeasonResults } from "@repo/types";

@Injectable()
export class SeasonResultsService {
	constructor(
		@InjectModel(SeasonResultsModel.name)
		private seasonResultsModel: Model<SeasonResultsModel>,
	) {}

	async getSeasonResults(
		season: string,
	): Promise<APIResponse<F1SeasonResults>> {
		const results = await this.seasonResultsModel.findOne({ season }).lean();

		if (!results || !results.season) {
			throw new NotFoundException({
				error: `No results found for season: ${season}`,
			});
		}

		return {
			data: {
				...results,
				season: season,
				Winner: calculateWinner(results.Races ?? []),
			},
		};
	}
}
