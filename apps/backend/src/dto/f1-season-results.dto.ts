import { IsString, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { RaceDto } from "./race.dto";
import type { F1SeasonResults } from "@repo/types";
import { RaceWinnerDto } from "./race-winner.dto";

export class F1SeasonResultsDto implements F1SeasonResults {
	@IsString()
	season!: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RaceDto)
	Races!: RaceDto[];

	@ValidateNested()
	@Type(() => RaceWinnerDto)
	Winner!: {
		globalWinner: RaceWinnerDto;
		racesWinners: RaceWinnerDto[];
	};
}
