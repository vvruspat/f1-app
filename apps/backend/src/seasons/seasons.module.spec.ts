import { Test, type TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { SeasonsModule } from "./seasons.module";
import { SeasonsService } from "./seasons.service";
import { SeasonsController } from "./seasons.controller";
import { SeasonModel } from "../db/schemas/season.schema";
import { SeasonResultsModel } from "../db/schemas/results.schema";
import { CacheInterceptor } from "@nestjs/cache-manager";

class MockCacheInterceptor {}
describe("SeasonsModule", () => {
	let moduleRef: TestingModule;

	beforeAll(async () => {
		moduleRef = await Test.createTestingModule({
			imports: [SeasonsModule],
		})
			.overrideProvider(getModelToken(SeasonModel.name))
			.useValue({})
			.overrideProvider(getModelToken(SeasonResultsModel.name))
			.useValue({})
			.overrideInterceptor(CacheInterceptor)
			.useClass(MockCacheInterceptor)
			.compile();
	});

	it("should compile the module", () => {
		expect(moduleRef).toBeDefined();
	});

	it("should provide SeasonsService", () => {
		const service = moduleRef.get<SeasonsService>(SeasonsService);
		expect(service).toBeInstanceOf(SeasonsService);
	});

	it("should provide SeasonsController", () => {
		const controller = moduleRef.get<SeasonsController>(SeasonsController);
		expect(controller).toBeInstanceOf(SeasonsController);
	});

	it("should register SeasonModel schema", () => {
		const modelToken = getModelToken(SeasonModel.name);
		const model = moduleRef.get(modelToken);
		expect(model).toBeDefined();
	});
});
