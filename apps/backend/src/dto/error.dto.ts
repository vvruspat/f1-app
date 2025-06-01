import { ApiProperty } from "@nestjs/swagger";

export class APIErrorDto {
	@ApiProperty({
		description: "Error message",
		type: String,
		required: true,
	})
	error: string;
}
