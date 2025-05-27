import { RoundCard } from "../components/RoundCard";

export default function SeasonsPage({
	params,
}: {
	params: Promise<{ season: string }>;
}) {
	return <RoundCard />;
}
