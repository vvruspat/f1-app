import type { Circuit } from "@repo/types";
import { IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { LocationPosDto } from "./location-pos.dto";

export class CircuitDto implements Circuit {
	@IsString()
	circuitId!: string;

	@IsString()
	url!: string;

	@IsString()
	circuitName!: string;

	@ValidateNested()
	@Type(() => LocationPosDto)
	Location!: LocationPosDto;
}
