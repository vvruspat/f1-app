import type { Circuit } from "./circuit";
import type { RaceResult } from "./raceResult";

export type Race = {
	season: string;
	round: string;
	url: string;
	raceName: string;
	Circuit: Circuit;
	date: string;
	time: string;
	Results: RaceResult[];
};
