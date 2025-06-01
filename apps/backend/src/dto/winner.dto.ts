import type { Winner } from "@repo/types";
import { IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class WinnerDto implements Winner {
  @ApiProperty({ description: 'Year of the championship', type: String })
  @IsString()
  year!: string;

  @ApiProperty({ description: 'Name of the winning driver', type: String })
  @IsString()
  driver!: string;

  @ApiProperty({ description: 'Total points of the winner', type: Number })
  @IsInt()
  points!: number;

  @ApiProperty({ description: 'Team of the winning driver', type: String })
  @IsString()
  team!: string;

  @ApiProperty({ description: 'Nationality of the winning driver', type: String })
  @IsString()
  nationality!: string;
}