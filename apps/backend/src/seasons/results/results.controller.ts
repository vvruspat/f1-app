import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiTags, ApiParam, ApiResponse } from "@nestjs/swagger";
import { SeasonResultsService } from "./results.service";
import type { APIResponse, F1SeasonResults } from "@repo/types";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import { SeasonResultsResponseDto } from "../../dto/endpoints/season-results.response.dto";
import { APIErrorDto } from "../../dto/error.dto";

@ApiTags("Seasons")
@Controller()
export class SeasonResultsController {
	constructor(private readonly seasonResultsService: SeasonResultsService) {}

	@CacheTTL(60 * 60 * 24 * 30) // 30 days in seconds
	@UseInterceptors(CacheInterceptor)
	@Get("seasons/:season")
	@ApiParam({ name: "season", type: String, description: "Season year" })
	@ApiResponse({ status: 200, type: SeasonResultsResponseDto })
	@ApiResponse({
		status: 404,
		description: "Season not found",
		type: APIErrorDto,
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
		type: APIErrorDto,
	})
	async getSeasonResults(
		@Param("season") season: string,
	): Promise<APIResponse<F1SeasonResults>> {
		return await this.seasonResultsService.getSeasonResults(season);
	}
}
