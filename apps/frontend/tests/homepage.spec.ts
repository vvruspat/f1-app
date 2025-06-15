import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
	const currentYear = new Date().getFullYear();

	test("should display the main heading", async ({ page }) => {
		await page.goto("http://localhost:3000/");
		// Wait for redirect to /season/{currentYear}
		await page.waitForURL(`**/season/${currentYear}`);

		await expect(page).toHaveTitle(
			new RegExp(`Season ${currentYear} Formula 1 results`, "i"),
		);

		const heading = page.getByRole("heading", {
			name: new RegExp(`LEADER ${currentYear}`, "i"),
		});
		await expect(heading).toBeVisible();
	});

	test("should navigate to a season page when a season is selected", async ({
		page,
	}) => {
		await page.goto("http://localhost:3000/");
		await page.waitForURL(`**/season/${currentYear}`);

		const seasonLink = page.getByRole("link", { name: /2019/i });
		await seasonLink.click();

		await page.waitForURL("**/season/2019");

		await expect(page).toHaveTitle(/Season 2019 Formula 1 results/i);

		const heading = page.getByRole("heading", { name: /WINNER 2019/i });
		await expect(heading).toBeVisible();
	});

	test("list of round winners should be not empty", async ({ page }) => {
		await page.goto("http://localhost:3000/");
		await page.waitForURL(`**/season/${currentYear}`);

		const roundCards = await page.getByRole("region", {
			name: "Max Verstappen",
		});
		const roundCardCount = await roundCards.count();

		await expect(roundCardCount).toBeGreaterThan(0);
	});

	test("click on the button with aria label 'Get more info about round winner' in round card should reveal info about speed", async ({
		page,
	}) => {
		await page.goto("http://localhost:3000/");
		await page.waitForURL(`**/season/${currentYear}`);

		const roundCard = await page
			.getByRole("region", {
				name: "Max Verstappen",
			})
			.first();

		const infoButton = await roundCard.getByRole("button", {
			name: "Get more info about round winner",
		});

		await infoButton.click();
		await page.waitForTimeout(300); // Wait for the animation to complete

		// After click, the card should expand and show round info (Speed, Points, Time)
		await expect(
			roundCard.getByRole("heading", { name: "Km/h" }),
		).toBeVisible();

		await expect(
			roundCard.getByRole("heading", { name: "Points" }),
		).toBeVisible();

		await expect(
			roundCard.getByRole("heading", { name: "Time" }),
		).toBeVisible();
	});
});
