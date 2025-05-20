import type { Time } from "@repo/types";
import { IsOptional, IsString } from "class-validator";

export class TimeDto implements Time {
  @IsOptional()
  @IsString()
  millis?: string;

  @IsString()
  time!: string;
}