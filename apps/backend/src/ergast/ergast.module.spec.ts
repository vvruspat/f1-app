import { Test, type TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { ErgastModule } from "./ergast.module";
import { ErgastService } from "./ergast.service";
import { SeasonModel } from "../db/schemas/season.schema";
import { SeasonResultsModel } from "../db/schemas/results.schema";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";

class MockCacheInterceptor {}

describe("ErgastModule", () => {
	let module: TestingModule;

	beforeEach(async () => {
		module = await Test.createTestingModule({
			imports: [ErgastModule],
		})
			.overrideProvider(getModelToken(SeasonModel.name))
			.useValue({})
			.overrideProvider(getModelToken(SeasonResultsModel.name))
			.useValue({})
			.overrideProvider(ConfigService)
			.useValue({ get: jest.fn() })
			.overrideProvider(ErgastService)
			.useValue({
				onApplicationBootstrap: jest.fn(),
				fetchSeasonResults: jest.fn(),
				fetchSeasons: jest.fn(),
				syncSeasons: jest.fn(),
				syncSeasonsResults: jest.fn(),
			})
			.overrideInterceptor(CacheInterceptor)
			.useClass(MockCacheInterceptor)
			.compile();
	});

	it("should be defined", () => {
		const ergastModule = module.get<ErgastModule>(ErgastModule);
		expect(ergastModule).toBeDefined();
	});

	it("should provide ErgastService", () => {
		const ergastService = module.get<ErgastService>(ErgastService);
		expect(ergastService).toBeDefined();
	});
});
