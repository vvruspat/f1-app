import type { Constructor } from "@repo/types";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ConstructorDto implements Constructor {
  @ApiProperty({ description: 'Unique identifier for the constructor', type: String })
  @IsString()
  constructorId!: string;

  @ApiProperty({ description: 'URL for more information about the constructor', type: String })
  @IsString()
  url!: string;

  @ApiProperty({ description: 'Name of the constructor', type: String })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Nationality of the constructor', type: String })
  @IsString()
  nationality!: string;
}