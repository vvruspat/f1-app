import type { Race } from "@repo/types";
import { IsString, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { CircuitDto } from "./circuit.dto";
import { RaceResultDto } from "./race-result.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RaceDto implements Race {
  @ApiProperty({ description: 'Season year of the race', type: String })
  @IsString()
  season!: string;

  @ApiProperty({ description: 'Round number of the race in the season', type: String })
  @IsString()
  round!: string;

  @ApiProperty({ description: 'URL for more information about the race', type: String })
  @IsString()
  url!: string;

  @ApiProperty({ description: 'Official name of the race', type: String })
  @IsString()
  raceName!: string;

  @ApiProperty({ description: 'Circuit details for the race', type: () => CircuitDto })
  @ValidateNested()
  @Type(() => CircuitDto)
  Circuit!: CircuitDto;

  @ApiProperty({ description: 'Date of the race', type: String })
  @IsString()
  date!: string;

  @ApiProperty({ description: 'Time of the race', type: String })
  @IsString()
  time!: string;

  @ApiProperty({ description: 'List of results for the race', type: () => RaceResultDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RaceResultDto)
  Results!: RaceResultDto[];
}
