import type { Driver } from "@repo/types";
import { IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DriverDto implements Driver {
  @ApiProperty({ description: 'Unique identifier for the driver', type: String })
  @IsString()
  driverId!: string;

  @ApiProperty({ description: 'Permanent number of the driver', type: Number })
  @IsInt()
  permanentNumber!: number;

  @ApiProperty({ description: 'Driver code (e.g., HAM)', type: String })
  @IsString()
  code!: string;

  @ApiProperty({ description: 'URL for more information about the driver', type: String })
  @IsString()
  url!: string;

  @ApiProperty({ description: 'Given name of the driver', type: String })
  @IsString()
  givenName!: string;

  @ApiProperty({ description: 'Family name of the driver', type: String })
  @IsString()
  familyName!: string;

  @ApiProperty({ description: 'Date of birth of the driver', type: String })
  @IsString()
  dateOfBirth!: string;

  @ApiProperty({ description: 'Nationality of the driver', type: String })
  @IsString()
  nationality!: string;
}