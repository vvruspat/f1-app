import type { Country } from "@repo/types";
import { IsBoolean, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CountryDto implements Country {
  @ApiProperty({ description: 'Capital city of the country', type: String })
  @IsString()
  capital!: string;

  @ApiProperty({ description: 'Country code', type: String })
  @IsString()
  code!: string;

  @ApiProperty({ description: 'Continent of the country', type: String })
  @IsString()
  continent!: string;

  @ApiProperty({ description: 'URL to the 1x1 flag image', type: String })
  @IsString()
  flag_1x1!: string;

  @ApiProperty({ description: 'URL to the 4x3 flag image', type: String })
  @IsString()
  flag_4x3!: string;

  @ApiProperty({ description: 'Indicates if it is an ISO country', type: Boolean })
  @IsBoolean()
  iso!: boolean;

  @ApiProperty({ description: 'Name of the country', type: String })
  @IsString()
  name!: string;
}