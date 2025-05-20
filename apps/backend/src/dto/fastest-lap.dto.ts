import type { FastestLap } from "@repo/types";
import { IsInt, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AverageSpeedDto } from "./avarage-speed.dto";
import { TimeDto } from "./time.dto";

export class FastestLapDto implements FastestLap {
  @IsInt()
  rank!: number;

  @IsInt()
  lap!: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => TimeDto)
  Time?: TimeDto;

  @ValidateNested()
  @Type(() => AverageSpeedDto)
  AverageSpeed!: AverageSpeedDto;
}