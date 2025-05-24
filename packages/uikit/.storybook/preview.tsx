import React from "react";
import "./preview.css";

import type { ThemeConfig } from "storybook-addon-data-theme-switcher";

export const initialGlobals = {
	dataThemes: {
		list: [
			{ name: "Light", dataTheme: "light", color: "#ffffff" },
			{ name: "Dark", dataTheme: "dark", color: "#000000" },
		],
		dataAttribute: "data-theme", // optional (default: "data-theme")
		clearable: true, // optional (default: true)
		toolbar: {
			title: "Change data-theme attribute", // optional
			icon: "PaintBrushIcon", // optional
		},
	} satisfies ThemeConfig,
};

const preview = {
	decorators: [
		(Story, { _parameters }) => {
			document.documentElement.setAttribute("data-brand", "f1-app");
			document.documentElement.setAttribute("data-platform", "desktop");
			return <Story />;
		},
	],
};

import "../src/styles/index.css";

export default preview;
