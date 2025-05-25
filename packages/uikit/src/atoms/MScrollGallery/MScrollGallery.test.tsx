import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MScrollGallery } from "./MScrollGallery";
import { MButton } from "../MButton";

test("renders MScrollGallery", () => {
	render(
		<MScrollGallery
			options={[
				{ key: "1", value: <MButton>1 text</MButton> },
				{ key: "2", value: <MButton>2 text</MButton> },
			]}
		/>,
	);

	const buttons = screen.getAllByRole("button");
	expect(buttons.length).toEqual(2);
	expect(buttons[0]).toHaveTextContent("1 text");
	expect(buttons[1]).toHaveTextContent("2 text");
});
