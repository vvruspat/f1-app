import {
	MBadge,
	MButton,
	MCaption,
	MCard,
	MFlag,
	MFlex,
	MHeading,
	MIconArrowDown,
	MText,
} from "@repo/uikit";
import { useState } from "react";

export const RoundCard = () => {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<MCard
			showHeaderDivider
			collapsed={collapsed}
			aria-expanded={!collapsed}
			header={
				<MFlex direction="column">
					<MCaption>Round 1 | 18 Mar 2022</MCaption>
					<MHeading mode="h2">Charles Leclerc</MHeading>
					<MButton
						mode="transparent"
						before={<MFlag size="l" nationality="Belgian" />}
						after={<MIconArrowDown mode="regular" />}
						stretch
						justify="space-between"
						onClick={() => setCollapsed((prev) => !prev)}
						aria-label="Get more info about round winner"
					>
						<MFlex align="center" justify="start">
							<MBadge mode="primary">RED BULL | TORO ROSSO</MBadge>
						</MFlex>
					</MButton>
				</MFlex>
			}
		>
			<MFlex direction="column" justify="start" align="start">
				<MHeading mode="h3">Bahrain GP</MHeading>
				<MCaption>Albert Park Grand Prix Circuit</MCaption>

				<MFlex direction="row" justify="start" align="stretch">
					<MBadge mode="primary">
						<MFlex direction="column">
							<MHeading mode="h4">Time</MHeading>
							<MText>1:37'33.584</MText>
						</MFlex>
					</MBadge>

					<MBadge mode="primary">
						<MFlex direction="column">
							<MHeading mode="h4">Time</MHeading>
							<MText>1:37'33.584</MText>
						</MFlex>
					</MBadge>

					<MBadge mode="primary">
						<MFlex direction="column">
							<MHeading mode="h4">Time</MHeading>
							<MText>1:37'33.584</MText>
						</MFlex>
					</MBadge>
				</MFlex>
			</MFlex>
		</MCard>
	);
};
