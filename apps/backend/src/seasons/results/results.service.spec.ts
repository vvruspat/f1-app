import { Test, type TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { SeasonResultsService } from "./results.service";
import { SeasonResultsModel } from "../../db/schemas/results.schema";
import { NotFoundException } from "@nestjs/common";
import { calculateWinner } from "../../utils/calculateWinners";

describe("SeasonResultsService", () => {
	let service: SeasonResultsService;
	let model: {
		findOne: jest.Mock;
	};

	beforeEach(async () => {
		model = {
			findOne: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SeasonResultsService,
				{
					provide: getModelToken(SeasonResultsModel.name),
					useValue: model,
				},
			],
		}).compile();

		service = module.get<SeasonResultsService>(SeasonResultsService);
	});

	it("returns data with computed winner when results exist", async () => {
		const season = "2023";
		const mockRaces = [
			{
				season: season,
				round: "1",
				url: "https://example.com/race",
				raceName: "Test GP",
				Circuit: {
					circuitId: "test-circuit",
					url: "https://example.com/circuit",
					circuitName: "Test Circuit",
					Location: {
						lat: "0.0000",
						long: "0.0000",
						locality: "Test City",
						country: "Test Country",
					},
				},
				date: "2023-01-01",
				time: "12:00:00Z",
				Results: [],
			},
		];
		const mockResults = { season, Races: mockRaces };
		model.findOne.mockReturnValue({
			lean: jest.fn().mockResolvedValue(mockResults),
		});

		const response = await service.getSeasonResults(season);

		expect(model.findOne).toHaveBeenCalledWith({ season });
		expect(response).toHaveProperty("data");
		expect(response.data?.season).toBe(season);
		expect(response.data?.Races).toBe(mockRaces);
		// Winner should be result of calculateWinner
		expect(response.data?.Winner).toEqual(calculateWinner(mockRaces));
	});

	it("throws NotFoundException when no results are found", async () => {
		const season = "1999";
		model.findOne.mockReturnValue({
			lean: jest.fn().mockResolvedValue(null),
		});

		await expect(service.getSeasonResults(season)).rejects.toBeInstanceOf(
			NotFoundException,
		);
	});

	it("throws NotFoundException when result has no season field", async () => {
		const season = "2000";
		const incomplete = { Races: [] };
		model.findOne.mockReturnValue({
			lean: jest.fn().mockResolvedValue(incomplete),
		});

		await expect(service.getSeasonResults(season)).rejects.toBeInstanceOf(
			NotFoundException,
		);
	});
});
