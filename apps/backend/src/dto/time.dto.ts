import type { Time } from "@repo/types";
import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TimeDto implements Time {
  @ApiProperty({ description: 'Time in milliseconds', type: String, required: false })
  @IsOptional()
  @IsString()
  millis?: string;

  @ApiProperty({ description: 'Formatted time string', type: String })
  @IsString()
  time!: string;
}