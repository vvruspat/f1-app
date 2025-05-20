import type { Driver } from "@repo/types";
import { IsString, IsInt } from "class-validator";

export class DriverDto implements Driver {
  @IsString()
  driverId!: string;

  @IsInt()
  permanentNumber!: number;

  @IsString()
  code!: string;

  @IsString()
  url!: string;

  @IsString()
  givenName!: string;

  @IsString()
  familyName!: string;

  @IsString()
  dateOfBirth!: string;

  @IsString()
  nationality!: string;
}