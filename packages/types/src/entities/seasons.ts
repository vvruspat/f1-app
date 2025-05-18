import type { Race } from "./race";
import type { Response } from "./response";

export type Season = {
	season: string;
	url: string;
};

export type SeasonsResponse = Response<{
	SeasonTable: {
		Seasons: Season[];
	};
}>;

export type SeasonResultsResponse = Response<{
	RaceTable: {
		season: number;
		Races: Race[];
	};
}>;
