import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { SeasonResultsService } from "./results.service";
import type { F1SeasonResults } from "@repo/types";
import { F1SeasonResultsDto } from "../../dto/f1-season-results.dto";

@ApiTags("season-results")
@Controller()
export class SeasonResultsController {
    constructor(private readonly seasonResultsService: SeasonResultsService) {}

    @Get("seasons/:season")
    @ApiParam({ name: "season", type: String, description: "Season year" })
    @ApiOkResponse({ type: F1SeasonResultsDto })
    async getSeasonResults(
        @Param("season") season: string,
    ): Promise<F1SeasonResults> {
        return await this.seasonResultsService.getSeasonResults(season);
    }
}
