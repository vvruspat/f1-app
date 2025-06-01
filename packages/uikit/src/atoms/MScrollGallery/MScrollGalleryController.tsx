"use client";

import { useEffect, useRef } from "react";

type MScrollGalleryControllerProps = { currentSlide: string };

export const MScrollGalleryController = ({
	currentSlide,
}: MScrollGalleryControllerProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const containerEl = ref.current?.parentElement;
		const targetEl = containerEl?.querySelector(currentSlide);

		targetEl?.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "center",
		});
	}, [currentSlide]);

	return <div ref={ref} />;
};
