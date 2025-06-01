import type { AverageSpeed } from "@repo/types";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AverageSpeedDto implements AverageSpeed {
	@ApiProperty({ description: "Units of speed (e.g., kmh)", type: String })
	@IsString()
	units!: string;

	@ApiProperty({ description: "Speed value", type: String })
	@IsString()
	speed!: string;
}
