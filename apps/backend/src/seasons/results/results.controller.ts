import { Controller, Get, Param } from "@nestjs/common";
import { SeasonResultsService } from "./results.service";
import type { RaceWinner, SeasonResults } from "@repo/types";

@Controller()
export class SeasonResultsController {
	constructor(private readonly seasonResultsService: SeasonResultsService) {}

	@Get("seasons/:season")
	async getSeasonResults(@Param("season") season: string): Promise<
		SeasonResults & {
			Winner: { globalWinner: RaceWinner; racesWinners: RaceWinner[] };
		}
	> {
		return await this.seasonResultsService.getSeasonResults(season);
	}
}
