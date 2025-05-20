import type { Race } from "@repo/types";
import { IsString, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { CircuitDto } from "./circuit.dto";
import { RaceResultDto } from "./race-result.dto";

export class RaceDto implements Race {
  @IsString()
  season!: string;

  @IsString()
  round!: string;

  @IsString()
  url!: string;

  @IsString()
  raceName!: string;

  @ValidateNested()
  @Type(() => CircuitDto)
  Circuit!: CircuitDto;

  @IsString()
  date!: string;

  @IsString()
  time!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RaceResultDto)
  Results!: RaceResultDto[];
}
