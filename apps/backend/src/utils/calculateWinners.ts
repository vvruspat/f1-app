import type { Race, RaceWinner } from "@repo/types";

export const calculateWinner = (results: Race[]) => {
	/** Global winner (driver with max points current year) */
	let globalWinner: RaceWinner = {
		round: "0",
		date: "",
		raceTitle: "",
		country: "",
		circuit: "",
		driver: "",
		nationality: "",
		team: "",
		/** Stat */
		time: "",
		speed: "",
		points: 0,
	};

	/** List of race winners */
	const racesWinners: RaceWinner[] = [];

	// Create key-value map of each driver
	const driversResult = new Map<string, RaceWinner>();

	// In each race we are calcul
	for (const res of results) {
		for (const result of res.Results) {
			const driverId = result.number.toString();
			let driver: RaceWinner;

			/** Calculate points for each driver */
			if (driversResult.has(driverId)) {
				// Since we checked has(), get() will not return undefined
				driver = driversResult.get(driverId) as RaceWinner;
				driver.points += Number(result.points);
			} else {
				driver = {
					round: res.round,
					date: res.date,
					raceTitle: res.raceName,
					country: "",
					circuit: res.Circuit.circuitName,
					driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
					nationality: result.Driver.nationality,
					team: result.Constructor.name,
					time: result.Time?.time ?? "0",
					speed: result.FastestLap?.AverageSpeed?.speed ?? "unknown",
					points: Number(result.points),
				};
			}

			driversResult.set(driverId, driver);

			/** Push to winners list winner of this race */
			if (result.position === "1") {
				racesWinners.push({
					round: res.round,
					date: res.date,
					raceTitle: res.raceName,
					country: "",
					circuit: res.Circuit.circuitName,
					driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
					nationality: result.Driver.nationality,
					team: result.Constructor.name,
					time: result.Time?.time ?? "0",
					speed: result.FastestLap?.AverageSpeed?.speed ?? "unknown",
					points: Number(result.points),
				});
			}
		}
	}

	/** Find maximum points driver */
	for (const driver of driversResult.values()) {
		if (driver.points > globalWinner.points) {
			globalWinner = driver;
		}
	}

	return { globalWinner, racesWinners };
};
