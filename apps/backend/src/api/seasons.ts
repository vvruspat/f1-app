import type { SeasonsErgastResponse } from "@repo/types";

// GET /seasons.json
const ERGAST_API_SERVER = process.env.ERGAST_API_SERVER;

export const fetchSeasons = (offset = 0, limit = 100) => {
	return $fetch<SeasonsErgastResponse>(
		`${ERGAST_API_SERVER}/seasons.json?offset=${offset}&limit=${limit}`,
	);
};
