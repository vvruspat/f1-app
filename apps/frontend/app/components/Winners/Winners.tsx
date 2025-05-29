import type { F1SeasonResults } from "@repo/types";
import { MFlex } from "@repo/uikit";
import { WinnerCard } from "../WinnerCard";
import { GlobalWinnerCard } from "../GlobalWinnerCard";

type WinnersProps = F1SeasonResults;

export const Winners = ({ Winner, season }: WinnersProps) => {
	return (
		<MFlex direction="column" justify="start" align="stretch" gap="xl">
			<GlobalWinnerCard {...Winner.globalWinner} season={season} />

			{Winner.racesWinners.map((winner) => (
				<WinnerCard {...winner} key={winner.round} />
			))}
		</MFlex>
	);
};
