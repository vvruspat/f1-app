import { Controller, Get, UseInterceptors } from "@nestjs/common";
// biome-ignore lint/style/useImportType: service should be imported in js bundle
import { SeasonsService } from "./seasons.service";
import type { Season } from "@repo/types";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import type { SeasonDto } from "../dto/seasons.dto";
import { ApiOkResponse } from "@nestjs/swagger";

@Controller()
export class SeasonsController {
	constructor(private readonly seasonsService: SeasonsService) {}

	@CacheTTL(60 * 60 * 24 * 30) // 30 days in seconds
	@UseInterceptors(CacheInterceptor)
	@ApiOkResponse({ type: Array<SeasonDto> })
	@Get("seasons")
	async getSeasons(): Promise<Season[]> {
		return await this.seasonsService.getSeasons();
	}
}
