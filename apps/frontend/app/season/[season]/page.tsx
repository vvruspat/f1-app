import { RoundCard } from "../../components/RoundCard";

export default function SeasonResultPage({
	params,
}: {
	params: Promise<{ season: string }>;
}) {
	return <RoundCard />;
}
