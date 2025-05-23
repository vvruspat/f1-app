import type { RaceWinner } from "@repo/types";
import { IsString, IsInt } from "class-validator";

export class RaceWinnerDto implements RaceWinner {
	@IsString()
	driver!: string;

	@IsInt()
	points!: number;

	@IsString()
	team!: string;

	@IsString()
	nationality!: string;

	@IsString()
	round!: string;

	@IsString()
	date!: string;

	@IsString()
	raceTitle!: string;

	@IsString()
	country!: string;

	@IsString()
	circuit!: string;

	@IsString()
	time!: string;

	@IsString()
	speed!: string;
}
