import type { Meta, StoryObj } from "@storybook/react";

import { MFlag } from "./MFlag";
import { countryNames, nationalityNames } from "./types";

const meta: Meta<typeof MFlag> = {
	title: "Atoms/Visual/MFlag",
	component: MFlag,
};

export default meta;

type Story = StoryObj<typeof MFlag>;

export const Basic: Story = {
	args: {
		size: "l",
		country: "Spain",
	},

	argTypes: {
		size: {
			control: { type: "select" },
			options: ["s", "m", "l"],
		},
		country: {
			control: { type: "select" },
			options: [undefined, ...countryNames],
		},
		nationality: {
			control: { type: "select" },
			options: [undefined, ...nationalityNames],
		},
	},
};
