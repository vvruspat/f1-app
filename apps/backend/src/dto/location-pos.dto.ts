import type { LocationPos } from "@repo/types";
import { IsString } from "class-validator";

export class LocationPosDto implements LocationPos {
  @IsString()
  lat!: string;

  @IsString()
  long!: string;

  @IsString()
  locality!: string;

  @IsString()
  country!: string;
}