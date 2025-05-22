import type { Race } from "./race";
import type { ErgastResponse } from "./ergastResponse";

export interface Season {
	season: string;
	url: string;
}

export interface SeasonsErgastResponse
	extends ErgastResponse<{
		SeasonTable: {
			Seasons: Season[];
		};
	}> {}

export interface SeasonResults {
	season: string;
	Races: Race[];
}

export interface SeasonResultsErgastResponse
	extends ErgastResponse<{
		RaceTable: SeasonResults;
	}> {}
