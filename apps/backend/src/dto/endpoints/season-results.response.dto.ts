import { ApiProperty } from "@nestjs/swagger";
import type { APIResponse, F1SeasonResults } from "@repo/types";
import { F1SeasonResultsDto } from "../season-results.dto";

export class SeasonResultsResponseDto implements APIResponse<F1SeasonResults> {
	@ApiProperty({
		description: "Ronds season results and winners",
		type: F1SeasonResultsDto,
	})
	data?: F1SeasonResults;
	@ApiProperty({
		description: "Error message if any",
		type: String,
		required: false,
	})
	error?: string;
}
