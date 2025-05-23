import type { SeasonResults } from "./seasons";
import type { RaceWinner } from "./winner";
export interface F1SeasonResults extends SeasonResults {
	Winner: { globalWinner: RaceWinner; racesWinners: RaceWinner[] };
}
