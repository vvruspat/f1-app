import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { SeasonsService } from "./seasons.service";
import type { Season } from "@repo/types";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@Controller()
export class SeasonsController {
	constructor(private readonly seasonsService: SeasonsService) {}

	@CacheTTL(60 * 60 * 24 * 30) // 30 days in seconds
	@UseInterceptors(CacheInterceptor)
	@Get("seasons")
	async getSeasons(): Promise<Season[]> {
		return await this.seasonsService.getSeasons();
	}
}
