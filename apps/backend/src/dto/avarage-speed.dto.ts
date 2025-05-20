import type { AverageSpeed } from "@repo/types";
import { IsString } from "class-validator";

export class AverageSpeedDto implements AverageSpeed {
  @IsString()
  units!: string;

  @IsString()
  speed!: string;
}