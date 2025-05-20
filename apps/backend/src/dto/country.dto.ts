import type { Country } from "@repo/types";
import { IsBoolean, IsString } from "class-validator";

export class CountryDto implements Country {
  @IsString()
  capital!: string;

  @IsString()
  code!: string;

  @IsString()
  continent!: string;

  @IsString()
  flag_1x1!: string;

  @IsString()
  flag_4x3!: string;

  @IsBoolean()
  iso!: boolean;

  @IsString()
  name!: string;
}