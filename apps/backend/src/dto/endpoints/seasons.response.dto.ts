import { ApiProperty } from "@nestjs/swagger";
import type { APIResponse, Season } from "@repo/types";
import { SeasonDto } from "../seasons.dto";

export class SeasonsResponseDto implements APIResponse<Season[]> {
	@ApiProperty({
		description: "List of seasons",
		type: SeasonDto,
		isArray: true,
	})
	data?: Season[];
	@ApiProperty({
		description: "Error message if any",
		type: String,
		required: false,
	})
	error?: string;
}
