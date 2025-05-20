import type { Constructor } from "@repo/types";
import { IsString } from "class-validator";

export class ConstructorDto implements Constructor {
  @IsString()
  constructorId!: string;

  @IsString()
  url!: string;

  @IsString()
  name!: string;

  @IsString()
  nationality!: string;
}