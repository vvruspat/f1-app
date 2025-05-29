"use server";

import { cookies } from "next/headers";

export async function setThemeAction(theme: "light" | "dark") {
	const cookieStore = await cookies();

	cookieStore.set({
		name: "theme",
		value: theme,
		path: "/",
	});
}
