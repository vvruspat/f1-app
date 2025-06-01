import type { RaceWinner } from "@repo/types";
import { IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RaceWinnerDto implements RaceWinner {
    @ApiProperty({ description: 'Name of the winning driver', type: String })
    @IsString()
    driver!: string;

    @ApiProperty({ description: 'Points scored by the winner', type: Number })
    @IsInt()
    points!: number;

    @ApiProperty({ description: 'Team of the winning driver', type: String })
    @IsString()
    team!: string;

    @ApiProperty({ description: 'Nationality of the winning driver', type: String })
    @IsString()
    nationality!: string;

    @ApiProperty({ description: 'Round number of the race', type: String })
    @IsString()
    round!: string;

    @ApiProperty({ description: 'Date of the race', type: String })
    @IsString()
    date!: string;

    @ApiProperty({ description: 'Title of the race', type: String })
    @IsString()
    raceTitle!: string;

    @ApiProperty({ description: 'Country where the race was held', type: String })
    @IsString()
    country!: string;

    @ApiProperty({ description: 'Circuit where the race was held', type: String })
    @IsString()
    circuit!: string;

    @ApiProperty({ description: 'Winning time', type: String })
    @IsString()
    time!: string;

    @ApiProperty({ description: 'Average speed of the winner', type: String })
    @IsString()
    speed!: string;
}
