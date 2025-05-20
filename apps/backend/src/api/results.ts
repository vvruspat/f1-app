import type { SeasonResultsErgastResponse } from "@repo/types";

// GET /{season}/results.json
const ERGAST_API_SERVER = process.env.ERGAST_API_SERVER;

export const fetchSeasonResults = (season: string, limit = 100) => {
	return $fetch<SeasonResultsErgastResponse>(
		`${ERGAST_API_SERVER}/${season}/results.json?limit=${limit}`,
	);
};
