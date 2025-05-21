import { Controller, Get } from "@nestjs/common";
import { SeasonResultsService } from "./results.service";

@Controller()
export class SeasonResultsController {
	constructor(private readonly seasonResultsService: SeasonResultsService) {}

	@Get("seasons/:season")
	getHello(): string {
		return this.seasonResultsService.getHello();
	}
}
