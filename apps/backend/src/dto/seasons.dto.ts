import type { Season } from "@repo/types";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SeasonDto implements Season {
    @ApiProperty({ description: 'The season year', type: String })
    @IsString()
    season!: string;

    @ApiProperty({ description: 'URL for more information about the season', type: String })
    @IsString()
    url!: string;
}
