import type { RaceResult } from "@repo/types";
import { IsString, IsInt, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ConstructorDto } from "./constructor.dto";
import { DriverDto } from "./driver.dto";
import { FastestLapDto } from "./fastest-lap.dto";
import { TimeDto } from "./time.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RaceResultDto implements RaceResult {
    @ApiProperty({ description: 'Car number of the driver', type: String })
    @IsString()
    number!: string;

    @ApiProperty({ description: 'Finishing position of the driver', type: String })
    @IsString()
    position!: string;

    @ApiProperty({ description: 'Text representation of the finishing position (e.g., "1", "DNF")', type: String })
    @IsString() // Changed from IsInt to match string type
    positionText!: string;

    @ApiProperty({ description: 'Points awarded to the driver', type: Number })
    @IsInt()
    points!: number;

    @ApiProperty({ description: 'Driver details', type: () => DriverDto })
    @ValidateNested()
    @Type(() => DriverDto)
    Driver!: DriverDto;

    @ApiProperty({ description: 'Constructor details', type: () => ConstructorDto })
    @ValidateNested()
    @Type(() => ConstructorDto)
    Constructor!: ConstructorDto;

    @ApiProperty({ description: 'Starting grid position of the driver', type: Number })
    @IsInt()
    grid!: number;

    @ApiProperty({ description: 'Number of laps completed by the driver', type: Number })
    @IsInt()
    laps!: number;

    @ApiProperty({ description: 'Finishing status of the driver (e.g., Finished, +1 Lap)', type: String })
    @IsString()
    status!: string;

    @ApiProperty({ description: 'Total race time for the driver', type: () => TimeDto, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => TimeDto)
    Time?: TimeDto;

    @ApiProperty({ description: 'Fastest lap details for the driver', type: () => FastestLapDto })
    @ValidateNested()
    @Type(() => FastestLapDto)
    FastestLap!: FastestLapDto;
}
