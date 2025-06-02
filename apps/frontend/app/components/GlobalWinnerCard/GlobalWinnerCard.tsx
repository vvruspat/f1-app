"use client";

import type { RaceWinner } from "@repo/types";
import {
	MBadge,
	MCaption,
	MCard,
	MFlag,
	MFlex,
	MHeading,
	MText,
} from "@repo/uikit";
import styles from "./GlobalWinnerCard.module.css";

type GlobalWinnerCardProps = RaceWinner & {
	season: string;
};

export const GlobalWinnerCard = ({
	season,
	...globalWinner
}: GlobalWinnerCardProps) => {
	return (
		<MCard
			borderLeftTopRadius="4xl"
			borderLeftBottomRadius="4xl"
			borderRightBottomRadius="4xl"
			borderRightTopRadius="4xl"
			shadow={false}
			className={styles.globalWinner}
			tabIndex={0}
			aria-label={`Winner of season ${season}`}
		>
			<MFlex direction="column" align="stretch" justify="start">
				<MFlex justify="space-between">
					<MFlex direction="column" align="start" justify="start">
						<MHeading mode="h1" className={styles.winnerBlockTitle}>
							<MCaption className={styles.captionWinner}>
								WINNER {season}
							</MCaption>
						</MHeading>
						<MHeading mode="h2" className={styles.headerWinner}>
							{globalWinner.driver}
						</MHeading>
					</MFlex>
					<MBadge mode="outlined">
						<MFlex direction="column">
							<MText>POINTS</MText>
							<div className={styles.globalWinnerPoints}>
								{globalWinner.points}
							</div>
						</MFlex>
					</MBadge>
				</MFlex>
				<MFlex justify="space-between">
					<MFlex align="center" justify="start">
						<MFlag size="s" nationality={globalWinner.nationality} />
						<MBadge mode="primary" className={styles.winnerTeam}>
							{globalWinner.team}
						</MBadge>
					</MFlex>
				</MFlex>
			</MFlex>
		</MCard>
	);
};
