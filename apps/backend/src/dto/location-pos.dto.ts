import type { LocationPos } from "@repo/types";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LocationPosDto implements LocationPos {
  @ApiProperty({ description: 'Latitude of the location', type: String })
  @IsString()
  lat!: string;

  @ApiProperty({ description: 'Longitude of the location', type: String })
  @IsString()
  long!: string;

  @ApiProperty({ description: 'Locality of the location', type: String })
  @IsString()
  locality!: string;

  @ApiProperty({ description: 'Country of the location', type: String })
  @IsString()
  country!: string;
}