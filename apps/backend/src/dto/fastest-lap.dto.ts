import type { FastestLap } from "@repo/types";
import { IsInt, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AverageSpeedDto } from "./average-speed.dto";
import { TimeDto } from "./time.dto";
import { ApiProperty } from "@nestjs/swagger";

export class FastestLapDto implements FastestLap {
	@ApiProperty({ description: "Rank of the fastest lap", type: Number })
	@IsInt()
	rank!: number;

	@ApiProperty({ description: "Lap number of the fastest lap", type: Number })
	@IsInt()
	lap!: number;

	@ApiProperty({
		description: "Time of the fastest lap",
		type: () => TimeDto,
		required: false,
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => TimeDto)
	Time?: TimeDto;

	@ApiProperty({
		description: "Average speed of the fastest lap",
		type: () => AverageSpeedDto,
	})
	@ValidateNested()
	@Type(() => AverageSpeedDto)
	AverageSpeed!: AverageSpeedDto;
}
