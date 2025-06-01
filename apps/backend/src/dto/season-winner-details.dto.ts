import { ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { RaceWinnerDto } from "./race-winner.dto";
import { ApiProperty } from "@nestjs/swagger";

export class SeasonWinnerDetailsDto {
    @ApiProperty({ type: () => RaceWinnerDto, description: "The overall winner of the season" })
    @ValidateNested()
    @Type(() => RaceWinnerDto)
    globalWinner!: RaceWinnerDto;

    @ApiProperty({ type: () => RaceWinnerDto, isArray: true, description: "List of winners for each race in the season" })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RaceWinnerDto)
    racesWinners!: RaceWinnerDto[];
}