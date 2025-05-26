import { MFlex, MThemeSelector } from "@repo/uikit";
import { F1Logo } from "../F1Logo";
import { SeasonSelector } from "../SeasonSelector/SeasonSelector";
import type { Season } from "@repo/types";

type HeaderProps = {
	seasons: Season[];
};

export const Header = ({ seasons }: HeaderProps) => {
	return (
		<header>
			<MFlex direction="column" justify="space-between" align="stretch">
				<MFlex direction="row" justify="space-between" align="start">
					<F1Logo />
					<MThemeSelector />
				</MFlex>
				<SeasonSelector seasons={seasons} />
			</MFlex>
		</header>
	);
};
