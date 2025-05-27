"use client";

import { useState, useEffect, type ComponentProps } from "react";
import { MButton } from "../MButton";
import { MIconMoon } from "../MIcon/icons/MIconMoon";
import { MIconSun } from "../MIcon/icons/MIconSun";

type MThemeSelectorProps = ComponentProps<typeof MButton> & {
	onSelectedTheme?: (theme: string) => void;
	defaultTheme?: string;
};

export const MThemeSelector = ({
	onSelectedTheme,
	defaultTheme = "light",
	...restButtonProps
}: MThemeSelectorProps) => {
	const [selectedTheme, setSelectedTheme] = useState(defaultTheme);

	useEffect(() => {
		const element = document.getElementsByTagName("html")[0];

		if (element) {
			element.dataset.theme = selectedTheme;
		}
	}, [selectedTheme]);

	const onClick = () => {
		setSelectedTheme((prevTheme) => {
			const newTheme = prevTheme === "light" ? "dark" : "light";
			if (onSelectedTheme) {
				onSelectedTheme(newTheme);
			}
			return newTheme;
		});
	};

	return (
		<MButton onClick={onClick} mode="transparent">
			{selectedTheme === "light" ? (
				<MIconSun mode="regular" width={24} />
			) : (
				<MIconMoon mode="regular" width={24} />
			)}
		</MButton>
	);
};

export default MThemeSelector;
