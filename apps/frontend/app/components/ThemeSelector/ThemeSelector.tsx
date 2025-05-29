"use client";

import { MThemeSelector } from "@repo/uikit";
import { setThemeAction } from "../../actions/setThemeAction";
import { useState, type ComponentProps } from "react";

type ThemeSelectorProps = Omit<
	ComponentProps<typeof MThemeSelector>,
	"onSelectedTheme"
>;

export const ThemeSelector = (themeSelectorProps: ThemeSelectorProps) => {
	const [theme, setTheme] = useState(themeSelectorProps.defaultTheme);
	const onThemeSelected = async (theme: "light" | "dark") => {
		await setThemeAction(theme);
		setTheme(theme);
	};

	return (
		<MThemeSelector
			onSelectedTheme={onThemeSelected}
			{...themeSelectorProps}
			aria-label={`Change theme button. Current theme is ${theme}`}
			aria-live="polite"
			aria-pressed={theme === "dark"}
		/>
	);
};
