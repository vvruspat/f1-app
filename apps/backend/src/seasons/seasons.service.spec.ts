import { Test, type TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { SeasonsService } from "./seasons.service";
import { SeasonModel } from "../db/schemas/season.schema";

describe("SeasonsService", () => {
	let service: SeasonsService;
	let model: { find: jest.Mock };

	beforeEach(async () => {
		model = { find: jest.fn() };
		// stub out .lean() chain
		model.find.mockReturnValue({ lean: jest.fn() });

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SeasonsService,
				{
					provide: getModelToken(SeasonModel.name),
					useValue: model,
				},
			],
		}).compile();

		service = module.get<SeasonsService>(SeasonsService);
	});

	it("should return mapped seasons when documents exist", async () => {
		const from = "2005";
		const docs = [
			{ season: "2005", url: "http://example.com/2005" },
			{ season: "2006", url: "http://example.com/2006" },
		];
		// mock lean() to resolve to docs
		(model.find().lean as jest.Mock).mockResolvedValue(docs);

		const result = await service.getSeasons(from);
		expect(model.find).toHaveBeenCalledWith({ season: { $gte: from } });
		expect(result).toEqual({
			data: [
				{ season: "2005", url: "http://example.com/2005" },
				{ season: "2006", url: "http://example.com/2006" },
			],
		});
	});

	it("should return empty data when no documents found", async () => {
		const from = "2010";
		(model.find().lean as jest.Mock).mockResolvedValue([]);

		const result = await service.getSeasons(from);
		expect(model.find).toHaveBeenCalledWith({ season: { $gte: from } });
		expect(result).toEqual({ data: [] });
	});
});
