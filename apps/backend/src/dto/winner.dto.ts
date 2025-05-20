import type { Winner } from "@repo/types";
import { IsString, IsInt } from "class-validator";

export class WinnerDto implements Winner {
  @IsString()
  year!: string;

  @IsString()
  driver!: string;

  @IsInt()
  points!: number;

  @IsString()
  team!: string;

  @IsString()
  nationality!: string;
}