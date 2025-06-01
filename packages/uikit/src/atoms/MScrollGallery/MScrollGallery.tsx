import type { PropsWithChildren, ReactNode } from "react";

import { MScrollGalleryController } from "./MScrollGalleryController";
import styles from "./MScrollGallery.module.css";
import MFlex from "../MFlex/MFlex";
import clsx from "clsx";

export type MScrollGalleryItemOption = {
	/** Key to identify option */
	key: string;
	/** Value to show */
	value: ReactNode;
};

type MScrollGalleryProps = {
	currentSlide?: MScrollGalleryItemOption["key"];
	options: MScrollGalleryItemOption[];
};

/**
 * MScrollGallery component
 */
export const MScrollGallery = ({
	currentSlide,
	options,
}: PropsWithChildren<MScrollGalleryProps>) => {
	return (
		<MFlex
			direction="row"
			align="center"
			justify="normal"
			wrap="nowrap"
			className={styles.scrollGallery}
			dir="ltr"
		>
			<MScrollGalleryController
				currentSlide={`[data-slide="${currentSlide}"]`}
			/>
			{options.map((option) => {
				return (
					<div
						key={option.key}
						data-slide={option.key}
						className={clsx(
							styles.scrollGalleryItem,
							styles.currentSlide && option.key === currentSlide,
						)}
					>
						{option.value}
					</div>
				);
			})}
		</MFlex>
	);
};
