import type { PropsWithChildren, ReactNode } from "react";

import styles from "./MScrollGallery.module.css";
import MFlex from "../MFlex/MFlex";

export type MScrollGalleryItemOption = {
	/** Key to identify option */
	key: string;
	/** Value to show */
	value: ReactNode;
};

type MScrollGalleryProps = {
	options: MScrollGalleryItemOption[];
};

/**
 * MScrollGallery component
 */
export const MScrollGallery = ({
	options,
}: PropsWithChildren<MScrollGalleryProps>) => {
	return (
		<MFlex
			direction="row"
			align="center"
			justify="center"
			wrap="nowrap"
			className={styles.MScrollGallery}
			dir="ltr"
		>
			{options.map((option) => {
				return (
					<div key={option.key} className={styles.MScrollGalleryItem}>
						{option.value}
					</div>
				);
			})}
		</MFlex>
	);
};
