import { Controller, Get } from "@nestjs/common";
import { SeasonsService } from "./seasons.service";
import type { Season } from "@repo/types";

@Controller()
export class SeasonsController {
	constructor(private readonly seasonsService: SeasonsService) {}

	@Get("seasons")
	async getSeasons(): Promise<Season[]> {
		return await this.seasonsService.getSeasons();
	}
}
