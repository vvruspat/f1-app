"use server";

import type { APIResponse, Season } from "@repo/types";

export async function getSeasonsAction(): Promise<APIResponse<Season[]>> {
	const backendUrl = process.env.NEXT_API_URL;

	try {
		const res = await fetch(`${backendUrl}/seasons`);

		if (!res.ok) {
			return {
				error: "Failed to fetch seasons",
			};
		}
		const data = await res.json();
		return { data };
	} catch (error) {
		return { error: "Server error" };
	}
}
