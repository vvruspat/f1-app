"use client";

import type { Season } from "@repo/types";
import { MLinkButton, MScrollGallery } from "@repo/uikit";
import styles from "./SeasonSelector.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";

type SeasonSelectorProps = {
	seasons: Season[];
	currentSeason?: string;
};

export const SeasonSelector = ({
	seasons,
	currentSeason,
}: SeasonSelectorProps) => {
	const router = useParams();

	currentSeason = router.season as string;

	return (
		<nav
			className={styles.seasonsNavBar}
			aria-label="Formula 1 seasons result list"
		>
			<MScrollGallery
				currentSlide={currentSeason}
				options={seasons.map((season) => ({
					key: season.season,
					value: (
						<MLinkButton
							linkComponent={Link}
							mode={currentSeason === season.season ? "primary" : "secondary"}
							href={`/season/${season.season}`}
							key={season.season}
							aria-label={`View result of season ${season.season}`}
							aria-current={currentSeason === season.season}
						>
							{season.season}
						</MLinkButton>
					),
				}))}
			/>
		</nav>
	);
};
