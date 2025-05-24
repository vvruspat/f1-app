import type { Season } from "@repo/types";
import { IsString } from "class-validator";

export class SeasonDto implements Season {
	@IsString()
	season!: string;

	@IsString()
	url!: string;
}
