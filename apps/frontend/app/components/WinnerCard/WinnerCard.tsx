"use client";

import type { RaceWinner } from "@repo/types";
import {
	MBadge,
	MButton,
	MCaption,
	MCard,
	MFlag,
	MFlex,
	MGrid,
	MHeading,
	MIconCaretDown,
	MText,
} from "@repo/uikit";
import { useId, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import styles from "./WinnerCard.module.css";
import clsx from "clsx";

type RaceWinnerCardProps = RaceWinner;

export const WinnerCard = (raceWinner: RaceWinnerCardProps) => {
	const [collapsed, setCollapsed] = useState(true);
	const id = useId();

	return (
		<MCard
			id={`winner-${id}`}
			as="section"
			aria-labelledby={`driver-${id}`}
			showHeaderDivider
			collapsed={collapsed}
			borderLeftTopRadius="4xl"
			borderLeftBottomRadius="4xl"
			borderRightBottomRadius="4xl"
			borderRightTopRadius="4xl"
			shadow={false}
			header={
				<MFlex direction="column" align="start" justify="start">
					<MCaption>
						Round {raceWinner.round} | {formatDate(raceWinner.date)}
					</MCaption>
					<MHeading mode="h2" id={`driver-${id}`}>
						{raceWinner.driver}
					</MHeading>
					<MButton
						mode="transparent"
						aria-expanded={!collapsed}
						aria-controls={`winner-${id}`}
						id={`toggle-${id}`}
						after={
							<MIconCaretDown
								mode="regular"
								className={clsx(
									styles.collapseIcon,
									collapsed && styles.collapsed,
								)}
							/>
						}
						stretch
						justify="space-between"
						onClick={() => setCollapsed((prev) => !prev)}
						aria-label="Get more info about round winner"
					>
						<MFlex align="center" justify="start">
							<MFlag size="s" nationality={raceWinner.nationality} />
							<MBadge mode="secondary" className={styles.winnerTeam}>
								{raceWinner.team}
							</MBadge>
						</MFlex>
					</MButton>
				</MFlex>
			}
		>
			<MFlex direction="column" justify="start" align="start">
				<MHeading mode="h3">{raceWinner.raceTitle}</MHeading>
				<MCaption>{raceWinner.circuit}</MCaption>

				<MGrid columnTemplate="repeat(3, 1fr)">
					<MBadge mode="secondary">
						<MFlex direction="column">
							<MHeading mode="h4">Time</MHeading>
							<MText className={styles.winnerValue}>{raceWinner.time}</MText>
						</MFlex>
					</MBadge>

					<MBadge mode="secondary">
						<MFlex direction="column">
							<MHeading mode="h4">Km/h</MHeading>
							<MText className={styles.winnerValue}>{raceWinner.speed}</MText>
						</MFlex>
					</MBadge>

					<MBadge mode="secondary">
						<MFlex direction="column">
							<MHeading mode="h4">Points</MHeading>
							<MText className={styles.winnerValue}>{raceWinner.points}</MText>
						</MFlex>
					</MBadge>
				</MGrid>
			</MFlex>
		</MCard>
	);
};
