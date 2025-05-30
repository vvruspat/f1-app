import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { SeasonResultsService } from "./results.service";
import type { F1SeasonResults } from "@repo/types";
import { F1SeasonResultsDto } from "../../dto/f1-season-results.dto";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@ApiTags("season-results")
@Controller()
export class SeasonResultsController {
	constructor(private readonly seasonResultsService: SeasonResultsService) {}

	@CacheTTL(60 * 60 * 24 * 30) // 30 days in seconds
	@UseInterceptors(CacheInterceptor)
	@Get("seasons/:season")
	@ApiParam({ name: "season", type: String, description: "Season year" })
	@ApiOkResponse({ type: F1SeasonResultsDto })
	async getSeasonResults(
		@Param("season") season: string,
	): Promise<F1SeasonResults> {
		return await this.seasonResultsService.getSeasonResults(season);
	}
}
