import type React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MFlag } from "./MFlag";
import { useCountry } from "./useCountry";
import "@testing-library/jest-dom";

// Mock the useCountry hook
jest.mock("./useCountry", () => ({
	useCountry: jest.fn(),
}));

describe("MFlag Component", () => {
	// Set up the mock return values for the useCountry hook
	const mockGetCountryByName = jest.fn();
	const mockGetCountryByNationality = jest.fn();

	beforeEach(() => {
		// Clear mocks before each test
		jest.clearAllMocks();
		jest.resetModules();

		(useCountry as jest.Mock).mockReturnValue({
			getCountryByName: mockGetCountryByName,
			getCountryByNationality: mockGetCountryByNationality,
		});

		mockGetCountryByName.mockReturnValue(undefined);
		mockGetCountryByNationality.mockReturnValue(undefined);
	});

	test("should render the correct flag for a given country", async () => {
		mockGetCountryByName.mockReturnValue("tm");
		mockGetCountryByNationality.mockReturnValue("tm");

		jest.mock("./flag-icons/flags/tm.svg", () => ({
			__esModule: true,
			default: () => <svg id="flag-icons-tm" />,
		}));

		render(<MFlag country="Turkmenistan" />);

		await waitFor(() => {
			expect(
				screen.getByTestId("flag").querySelector("#flag-icons-tm"),
			).toBeInTheDocument();
		});
	});

	test("should render the correct flag for a given nationality", async () => {
		mockGetCountryByName.mockReturnValue("gb");
		mockGetCountryByNationality.mockReturnValue("gb");

		jest.mock("./flag-icons/flags/gb.svg", () => ({
			__esModule: true,
			default: () => <svg id="flag-icons-gb" />,
		}));

		render(<MFlag nationality="British" />);

		await waitFor(() => {
			expect(
				screen.getByTestId("flag").querySelector("#flag-icons-gb"),
			).toBeInTheDocument();
		});
	});

	test("should apply the default size 's' class", () => {
		render(<MFlag country="Turkmenistan" />);
		const flagElement = screen.getByTestId("flag");
		expect(flagElement).toHaveClass("flag_s");
	});

	test.each([
		["s", "flag_s"],
		["m", "flag_m"],
		["l", "flag_l"],
	])("should apply the correct class for size '%s'", (size, expectedClass) => {
		render(<MFlag country="Turkmenistan" size={size as "s" | "m" | "l"} />);
		const flagElement = screen.getByTestId("flag");
		expect(flagElement).toHaveClass(expectedClass);
	});

	test("should forward additional props to the div element", () => {
		render(
			<MFlag country="Turkmenistan" id="custom-id" className="extra-class" />,
		);
		const flagElement = screen.getByTestId("flag");
		expect(flagElement).toHaveAttribute("id", "custom-id");
		expect(flagElement).toHaveClass("extra-class");
	});

	test("should render an empty div if country code is not found", async () => {
		mockGetCountryByName.mockReturnValue(undefined);
		mockGetCountryByNationality.mockReturnValue(undefined);

		render(<MFlag country="NonExistentCountry" />);
		const flagElement = screen.getByTestId("flag");

		await waitFor(() => {
			expect(flagElement).toBeInTheDocument();
			expect(flagElement.firstChild).toBeNull();
		});
	});
});
