import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { SeasonsService } from "./seasons.service";
import type { APIResponse, Season } from "@repo/types";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import { ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SeasonsResponseDto } from "../dto/endpoints/seasons.response.dto";
import { SeasonsRequestDto } from "../dto/endpoints/seasons.request.dto";
import { APIErrorDto } from "../dto/error.dto";

@Controller()
export class SeasonsController {
	constructor(private readonly seasonsService: SeasonsService) {}

	@ApiTags("Seasons")
	@CacheTTL(60 * 60 * 24 * 30) // 30 days in seconds
	@UseInterceptors(CacheInterceptor)
	@ApiOkResponse({ type: SeasonsResponseDto, description: "List of seasons" })
	@ApiResponse({
		status: 500,
		description: "Internal server error",
		type: APIErrorDto,
	})
	@ApiQuery({
		type: SeasonsRequestDto,
		description: "Query parameters for seasons",
	})
	@Get("seasons")
	async getSeasons(
		@Query("from") from = "2005",
	): Promise<APIResponse<Season[]>> {
		return await this.seasonsService.getSeasons(from);
	}
}
