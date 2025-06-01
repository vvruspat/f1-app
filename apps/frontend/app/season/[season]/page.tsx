import { redirect } from "next/navigation";
import { Winners } from "../../components/Winners";
import { getSeasonWinnersAction } from "../../actions/getSeasonWinnersAction";

export default async function SeasonResultPage({
	params,
}: {
	params: Promise<{ season: string }>;
}) {
	try {
		const season = (await params).season;

		const results = await getSeasonWinnersAction(season);

		if (results.error || !results.data) redirect("/error");

		return <Winners {...results.data} />;
	} catch (e) {
		redirect("/error");
	}
}
