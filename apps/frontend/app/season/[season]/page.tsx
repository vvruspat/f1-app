import { redirect } from "next/navigation";
import { Winners } from "../../components/Winners";
import { getSeasonWinnersAction } from "../../actions/getSeasonWinnersAction";
import type { Metadata } from "next";

type Props = {
	params: Promise<{ season: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { season } = await params;

	return {
		title: `Season ${season} Formula 1 results`,
		description: `Formula 1 results for the ${season} season`,
	};
}

export default async function SeasonResultPage({
	params,
}: {
	params: Promise<{ season: string }>;
}) {
	try {
		const season = (await params).season;

		const results = await getSeasonWinnersAction(season);

		console.log("Season results:", results);

		if (results.error || !results.data) redirect("/error");

		return <Winners {...results.data} />;
	} catch (e) {
		console.error("Error fetching season results:", e);
		redirect("/error");
	}
}
