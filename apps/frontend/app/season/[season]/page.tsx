import { redirect } from "next/navigation";
import { Winners } from "../../components/Winners";
import type { F1SeasonResults } from "@repo/types";

export default async function SeasonResultPage({
	params,
}: {
	params: Promise<{ season: string }>;
}) {
	try {
		const server = process.env.NEXT_WEB_API_URL;
		const season = (await params).season;

		const res = await fetch(`${server}/seasons/${season}`);

		if (!res.ok) {
			redirect("/500");
		}
		const results = (await res.json()) as F1SeasonResults;

		return <Winners {...results} />;
	} catch (e) {
		redirect("/error");
	}
}
