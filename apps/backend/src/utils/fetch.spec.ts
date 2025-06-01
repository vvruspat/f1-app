import { $fetch } from "./fetch";

describe("$fetch", () => {
	const originalFetch = global.fetch;

	afterEach(() => {
		global.fetch = originalFetch;
		jest.resetAllMocks();
	});

	it("resolves with JSON when response.ok is true", async () => {
		const mockData = { foo: "bar" };
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue(mockData),
		});

		const result = await $fetch<typeof mockData>("https://api.test/data");
		expect(result).toEqual(mockData);
		expect(global.fetch).toHaveBeenCalledWith("https://api.test/data");
	});

	it("throws when response.ok is false", async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			statusText: "Not Found",
		});

		await expect($fetch("https://api.test/missing")).rejects.toThrow(
			"Not Found",
		);
		expect(global.fetch).toHaveBeenCalledWith("https://api.test/missing");
	});

	it("propagates network errors", async () => {
		global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

		await expect($fetch("https://api.test/error")).rejects.toThrow(
			"Network error",
		);
		expect(global.fetch).toHaveBeenCalledWith("https://api.test/error");
	});
});
