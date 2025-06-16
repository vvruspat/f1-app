"use server";

import type { APIResponse, F1SeasonResults } from "@repo/types";

export async function getSeasonWinnersAction(
	season: string,
): Promise<APIResponse<F1SeasonResults>> {
	const backendUrl = process.env.NEXT_API_URL;

	try {
		const res = await fetch(`${backendUrl}/seasons/${season}`);

		if (!res.ok) {
			console.error(
				`Failed to fetch season ${season} winners:`,
				res.statusText,
				res.status,
			);
			return {
				error: `Failed to fetch season ${season} winners`,
			};
		}
		return await res.json();
	} catch (error) {
		console.error("Error fetching season winners:", error);
		return { error: "Server error" };
	}
}
