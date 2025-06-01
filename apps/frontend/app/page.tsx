import { redirect } from "next/navigation";
import { getSeasonsAction } from "./actions/getSeasonsAction";

export default async function Home() {
	const { data: seasons } = await getSeasonsAction();
	const seasonsLength = seasons?.length;

	if (seasonsLength) redirect(`/season/${seasons[seasonsLength - 1]?.season}`);

	return <section>There is no available F1 seasons results</section>;
}
