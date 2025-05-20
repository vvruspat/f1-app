import { calculateWinner } from "./calculateWinners";
import results from "./raceWinners.test-data.json";
import winnerResult from "./winnerResult.test-data.json";
import racesWinnersResult from "./racesWinnersResult.test-data.json";
import type { Race } from "@repo/types";

test("unit calculateWinner", () => {
	const { globalWinner, racesWinners } = calculateWinner(results);

	expect(globalWinner).toMatchObject(winnerResult);
	expect(racesWinners).toMatchObject(racesWinnersResult);
});

test("unit calculateWinner empty", () => {
	const { globalWinner, racesWinners } = calculateWinner([]);

	expect(globalWinner).toMatchObject({});
	expect(racesWinners).toMatchObject([]);
});
