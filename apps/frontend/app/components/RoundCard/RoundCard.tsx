"use client";

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
import { useState } from "react";

export const RoundCard = () => {
	const [collapsed, setCollapsed] = useState(true);
	return (
		<MCard
			showHeaderDivider
			collapsed={collapsed}
			aria-expanded={!collapsed}
			header={
				<MFlex direction="column" align="start" justify="start">
					<MCaption>Round 1 | 18 Mar 2022</MCaption>
					<MHeading mode="h2">Charles Leclerc</MHeading>
					<MButton
						mode="transparent"
						after={<MIconCaretDown mode="regular" />}
						stretch
						justify="space-between"
						onClick={() => setCollapsed((prev) => !prev)}
						aria-label="Get more info about round winner"
					>
						<MFlex align="center" justify="start">
							<MFlag size="m" nationality="Belgian" />
							<MBadge mode="primary">RED BULL | TORO ROSSO</MBadge>
						</MFlex>
					</MButton>
				</MFlex>
			}
		>
			<MFlex direction="column" justify="start" align="start">
				<MHeading mode="h3">Bahrain GP</MHeading>
				<MCaption>Albert Park Grand Prix Circuit</MCaption>

				<MGrid columnTemplate="repeat(3, 1fr)">
					<MBadge mode="primary">
						<MFlex direction="column">
							<MHeading mode="h4">Time</MHeading>
							<MText>1:37'33.584</MText>
						</MFlex>
					</MBadge>

					<MBadge mode="primary">
						<MFlex direction="column">
							<MHeading mode="h4">Km/h</MHeading>
							<MText>189.568</MText>
						</MFlex>
					</MBadge>

					<MBadge mode="primary">
						<MFlex direction="column">
							<MHeading mode="h4">Points</MHeading>
							<MText>26</MText>
						</MFlex>
					</MBadge>
				</MGrid>
			</MFlex>
		</MCard>
	);
};
