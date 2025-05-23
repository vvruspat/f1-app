import { Test, type TestingModule } from "@nestjs/testing";
import { SeasonsController } from "./seasons.controller";
import { SeasonsService } from "./seasons.service";
import type { Season } from "@repo/types";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

describe("SeasonsController", () => {
	let seasonsController: SeasonsController;
	let seasonsService: SeasonsService;

	beforeEach(async () => {
		const mockSeasonsService = {
			getSeasons: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [SeasonsController],
			providers: [
				{ provide: SeasonsService, useValue: mockSeasonsService },
				{ provide: CACHE_MANAGER, useValue: {} },
			],
		}).compile();

		seasonsController = module.get<SeasonsController>(SeasonsController);
		seasonsService = module.get<SeasonsService>(SeasonsService);
	});

	it("should be defined", () => {
		expect(seasonsController).toBeDefined();
	});

	describe("getSeasons", () => {
		it("should return an array of seasons", async () => {
			const result: Season[] = [
				{ season: "2023", url: "https://example.com/2023" },
				{ season: "2024", url: "https://example.com/2024" },
			];
			jest.spyOn(seasonsService, "getSeasons").mockResolvedValue(result);

			expect(await seasonsController.getSeasons()).toBe(result);
			expect(seasonsService.getSeasons).toHaveBeenCalled();
		});
	});
});
