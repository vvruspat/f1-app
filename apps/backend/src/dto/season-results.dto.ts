import { IsString, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { RaceDto } from "./race.dto";
import type { F1SeasonResults } from "@repo/types";
import { ApiProperty } from "@nestjs/swagger";
import { SeasonWinnerDetailsDto } from "./season-winner-details.dto"; // Import the new DTO

export class F1SeasonResultsDto implements F1SeasonResults {
	@ApiProperty({ description: "The season year", type: String })
	@IsString()
	season!: string;

	@ApiProperty({
		description: "List of races in the season",
		type: () => RaceDto,
		isArray: true,
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RaceDto)
	Races!: RaceDto[];

	@ApiProperty({
		description: "Winner details for the season",
		type: () => SeasonWinnerDetailsDto,
	})
	@ValidateNested()
	@Type(() => SeasonWinnerDetailsDto)
	Winner!: SeasonWinnerDetailsDto;
}
