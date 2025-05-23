import { Test, type TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { ErgastService } from "./ergast.service";
import { SeasonModel } from "../db/schemas/season.schema";
import { SeasonResultsModel } from "../db/schemas/results.schema";
import type { Race } from "@repo/types";

const races: Race[] = [
	{
		season: "2000",
		round: "1",
		raceName: "Australian Grand Prix",
		Circuit: {
			circuitId: "albert_park",
			url: "http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit",
			circuitName: "Albert Park Grand Prix Circuit",
			Location: {
				lat: "-37.8497",
				long: "144.968",
				locality: "Melbourne",
				country: "Australia",
			},
		},
		date: "2000-03-12",
		time: "14:00:00Z",
		url: "http://en.wikipedia.org/wiki/2000_Australian_Grand_Prix",
		Results: [
			{
				number: "1",
				position: "1",
				positionText: "1",
				points: 25,
				status: "Finished",
				grid: 1,
				laps: 58,
				Time: { time: "1:34:14.000" },
				Driver: {
					code: "MSC",
					url: "http://en.wikipedia.org/wiki/Michael_Schumacher",
					givenName: "Michael",
					familyName: "Schumacher",
					dateOfBirth: "1969-01-03",
					permanentNumber: 7,
					driverId: "michael_schumacher",
					nationality: "German",
				},
				Constructor: {
					constructorId: "ferrari",
					url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
					name: "Ferrari",
					nationality: "Italian",
				},
			},
		],
	},
];

describe("ErgastService", () => {
	let service: ErgastService;
	let seasonModel: {
		find: jest.Mock;
		lean: jest.Mock;
		deleteMany: jest.Mock;
		insertMany: jest.Mock;
		findOne: jest.Mock;
	};
	let resultsModel: {
		findOne: jest.Mock;
		deleteMany: jest.Mock;
		lean: jest.Mock;
		bulkWrite: jest.Mock;
	};
	let configService: { get: jest.Mock };

	beforeEach(async () => {
		seasonModel = {
			find: jest.fn().mockReturnThis(),
			lean: jest.fn(),
			deleteMany: jest.fn(),
			insertMany: jest.fn(),
			findOne: jest.fn().mockReturnThis(),
		};
		resultsModel = {
			findOne: jest.fn().mockReturnThis(),
			lean: jest.fn(),
			deleteMany: jest.fn(),
			bulkWrite: jest.fn(),
		};
		configService = {
			get: jest.fn().mockReturnValue("http://ergast.test/api/f1"),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ErgastService,
				{ provide: getModelToken(SeasonModel.name), useValue: seasonModel },
				{
					provide: getModelToken(SeasonResultsModel.name),
					useValue: resultsModel,
				},
				{ provide: ConfigService, useValue: configService },
			],
		}).compile();

		service = module.get<ErgastService>(ErgastService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("syncSeasons", () => {
		it("fetches and saves seasons if db is empty", async () => {
			const currentYear = new Date().getFullYear().toString();

			seasonModel.findOne.mockReturnThis();
			seasonModel.lean.mockResolvedValue(null);

			const apiSeasons = [{ season: currentYear, url: "url" }];

			jest.spyOn(service, "fetchSeasons").mockResolvedValue({
				MRData: {
					SeasonTable: { Seasons: apiSeasons },
					xmlns: "",
					series: "f1",
					url: "",
					limit: 10,
					offset: 0,
					total: 10,
				},
			});

			jest
				.spyOn(service, "fetchSeasonResults")
				.mockImplementation((season: string) =>
					Promise.resolve({
						MRData: {
							RaceTable: {
								Races: races,
								season,
							},
							xmlns: "",
							series: "f1",
							url: "",
							limit: 10,
							offset: 0,
							total: 10,
						},
					}),
				);
			seasonModel.deleteMany.mockResolvedValue({});
			seasonModel.insertMany.mockResolvedValue(apiSeasons);

			await service.syncSeasons();

			expect(seasonModel.deleteMany).toHaveBeenCalled();
			expect(seasonModel.insertMany).toHaveBeenCalledWith(apiSeasons);
		});
	});

	describe("syncSeasonsResults", () => {
		it("fetches and saves missing previous season results", async () => {
			const currentYear = new Date().getFullYear().toString();
			const seasons = [
				{ season: "2000", url: "" },
				{ season: currentYear, url: "" },
			];
			seasonModel.find.mockReturnThis();
			seasonModel.lean.mockResolvedValue(seasons);

			// Simulate: no results for 2000, but results for current year exist
			resultsModel.findOne.mockImplementation(
				({ season }: { season: string }) =>
					season === "2000" ? Promise.resolve(null) : Promise.resolve({}),
			);

			jest
				.spyOn(service, "fetchSeasonResults")
				.mockImplementation((season: string) =>
					Promise.resolve({
						MRData: {
							RaceTable: {
								Races: races,
								season,
							},
							xmlns: "",
							series: "f1",
							url: "",
							limit: 10,
							offset: 0,
							total: 10,
						},
					}),
				);

			await service.syncSeasonsResults(seasons);

			expect(resultsModel.bulkWrite).toHaveBeenCalled();
		});
	});
});
