import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MFlag } from "./MFlag";

test("renders flag by nationality", () => {
	render(<MFlag nationality="Dutch" />);

	const el = screen.getByTestId("flag");

	expect(el).toHaveClass("fi-nl");
	expect(el).toMatchSnapshot();
});

test("renders flag by country", () => {
	render(<MFlag country="Netherlands" />);

	const el = screen.getByTestId("flag");

	expect(el).toHaveClass("fi-nl");
	expect(el).toMatchSnapshot();
});
