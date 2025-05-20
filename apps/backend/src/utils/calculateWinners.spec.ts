import { calculateWinner } from "./calculateWinners";
import results from "./raceWinners.test-data";
import winnerResult from "./winnerResult.test-data";
import racesWinnersResult from "./racesWinnersResult.test-data";

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
