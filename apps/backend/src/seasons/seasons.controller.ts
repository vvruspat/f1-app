import { Controller, Get } from "@nestjs/common";
import { SeasonsService } from "./seasons.service";

@Controller()
export class SeasonsController {
	constructor(private readonly seasonsService: SeasonsService) {}

	@Get("seasons")
	getHello(): string {
		return this.seasonsService.getHello();
	}
}
