import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SeasonModel } from "../db/schemas/season.schema";
import type { Model } from "mongoose";
import type { APIResponse, Season } from "@repo/types";

@Injectable()
export class SeasonsService {
	constructor(
		@InjectModel(SeasonModel.name) private seasonModel: Model<SeasonModel>,
	) {}

	async getSeasons(from: Season["season"]): Promise<APIResponse<Season[]>> {
		const seasons = await this.seasonModel
			.find({ season: { $gte: from } })
			.lean();

		if (seasons.length === 0) {
			return { data: [] };
		}
		return {
			data: seasons.map((season) => ({
				season: season.season,
				url: season.url,
			})),
		};
	}
}
