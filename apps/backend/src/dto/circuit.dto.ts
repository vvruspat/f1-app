import type { Circuit } from "@repo/types";
import { IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { LocationPosDto } from "./location-pos.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CircuitDto implements Circuit {
    @ApiProperty({ description: 'Unique identifier for the circuit', type: String })
    @IsString()
    circuitId!: string;

    @ApiProperty({ description: 'URL for more information about the circuit', type: String })
    @IsString()
    url!: string;

    @ApiProperty({ description: 'Name of the circuit', type: String })
    @IsString()
    circuitName!: string;

    @ApiProperty({ description: 'Location details of the circuit', type: () => LocationPosDto })
    @ValidateNested()
    @Type(() => LocationPosDto)
    Location!: LocationPosDto;
}
