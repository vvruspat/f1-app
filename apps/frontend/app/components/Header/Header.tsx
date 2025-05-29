import React from "react";
import { MFlex } from "@repo/uikit";
import { F1Logo } from "../F1Logo";
import { SeasonSelector } from "../SeasonSelector/SeasonSelector";
import type { Season } from "@repo/types";
import type { ComponentProps } from "react";
import { ThemeSelector } from "../ThemeSelector";

type HeaderProps = ComponentProps<"header"> & {
	seasons: Season[];
	currentSeason?: string;
	currentTheme: "light" | "dark";
};

export const Header = ({
	seasons,
	currentSeason,
	currentTheme,
	...headerProps
}: HeaderProps) => {
	return (
		<header {...headerProps}>
			<MFlex
				direction="column"
				justify="space-between"
				align="stretch"
				gap="4xl"
			>
				<MFlex direction="row" justify="space-between" align="start">
					<F1Logo />
					<ThemeSelector defaultTheme={currentTheme} />
				</MFlex>
				<SeasonSelector seasons={seasons} currentSeason={currentSeason} />
			</MFlex>
		</header>
	);
};
