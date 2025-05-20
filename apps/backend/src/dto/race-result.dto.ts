import type { RaceResult } from "@repo/types";
import { IsString, IsInt, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ConstructorDto } from "./constructor.dto";
import { DriverDto } from "./driver.dto";
import { FastestLapDto } from "./fastest-lap.dto";
import { TimeDto } from "./time.dto";

export class RaceResultDto implements RaceResult {
	@IsString()
	number!: string;

	@IsString()
	position!: string;

	@IsInt()
	positionText!: string;

	@IsInt()
	points!: number;

	@ValidateNested()
	@Type(() => DriverDto)
	Driver!: DriverDto;

	@ValidateNested()
	@Type(() => ConstructorDto)
	Constructor!: ConstructorDto;

	@IsInt()
	grid!: number;

	@IsInt()
	laps!: number;

	@IsString()
	status!: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => TimeDto)
	Time?: TimeDto;

	@ValidateNested()
	@Type(() => FastestLapDto)
	FastestLap!: FastestLapDto;
}
