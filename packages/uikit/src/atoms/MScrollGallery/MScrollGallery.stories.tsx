import type { StoryObj, Meta } from "@storybook/react";
import {
	MScrollGallery,
	type MScrollGalleryItemOption,
} from "./MScrollGallery";
import { MButton } from "../MButton";

const meta: Meta<typeof MScrollGallery> = {
	title: "Atoms/Visual/MScrollGallery",
	component: MScrollGallery,
};

export default meta;

type Story = StoryObj<typeof MScrollGallery>;

const options: MScrollGalleryItemOption[] = [];

for (let i = 0; i < 60; i++) {
	const year = (2024 - i).toString();

	options.push({
		key: year,
		value: <MButton>{year}</MButton>,
	});
}

export const Basic: Story = {
	args: {
		options,
	},

	argTypes: {},
};
