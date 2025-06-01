import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SeasonsRequestDto {
	@ApiProperty({
		description: "Year from what season list should start",
		type: String,
	})
	@IsString()
	from: string;
}
