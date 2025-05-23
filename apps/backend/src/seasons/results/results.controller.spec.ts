import { Test, type TestingModule } from "@nestjs/testing";
import { SeasonResultsController } from "./results.controller";
import { SeasonResultsService } from "./results.service";

import winnerResult from "../../utils/winnerResult.test-data";
import racesWinnersResult from "../../utils//racesWinnersResult.test-data";
import raceWinners from "../../utils/raceWinners.test-data";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

describe("SeasonResultsController", () => {
	let seasonResultsController: SeasonResultsController;
	let seasonResultsService: SeasonResultsService;

	beforeEach(async () => {
		const mockSeasonResultsService = {
			getSeasonResults: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [SeasonResultsController],
			providers: [
				{ provide: SeasonResultsService, useValue: mockSeasonResultsService },
				{ provide: CACHE_MANAGER, useValue: {} },
			],
		}).compile();

		seasonResultsController = module.get<SeasonResultsController>(
			SeasonResultsController,
		);
		seasonResultsService =
			module.get<SeasonResultsService>(SeasonResultsService);
	});

	it("should be defined", () => {
		expect(seasonResultsController).toBeDefined();
	});

	describe("getSeasonResults", () => {
		it("should return season results with winner info", async () => {
			const season = "2023";
			const mockResult = {
				season: "2022",
				Races: raceWinners,
				Winner: {
					globalWinner: winnerResult,
					racesWinners: racesWinnersResult,
				},
			};
			jest
				.spyOn(seasonResultsService, "getSeasonResults")
				.mockResolvedValue(mockResult);

			const result = await seasonResultsController.getSeasonResults(season);
			expect(result).toBe(mockResult);
			expect(seasonResultsService.getSeasonResults).toHaveBeenCalledWith(
				season,
			);
		});
	});
});
