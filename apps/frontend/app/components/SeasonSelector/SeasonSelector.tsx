import type { Season } from "@repo/types";
import { MLinkButton, MScrollGallery } from "@repo/uikit";

type SeasonSelectorProps = {
	seasons: Season[];
};

export const SeasonSelector = ({ seasons }: SeasonSelectorProps) => {
	return (
		<MScrollGallery
			options={seasons.map((season) => ({
				key: season.season,
				value: (
					<MLinkButton
						mode="secondary"
						href={`/season/${season.season}`}
						key={season.season}
					>
						{season.season}
					</MLinkButton>
				),
			}))}
		/>
	);
};
