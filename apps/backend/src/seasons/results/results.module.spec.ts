import { Test, type TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { CacheModule } from "@nestjs/cache-manager";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { SeasonResultsModule } from "./results.module";
import { SeasonResultsService } from "./results.service";
import { SeasonResultsController } from "./results.controller";
import { SeasonResultsModel } from "../../db/schemas/results.schema";

class MockCacheInterceptor {}

describe("SeasonResultsModule", () => {
	let moduleRef: TestingModule;

	beforeAll(async () => {
		moduleRef = await Test.createTestingModule({
			imports: [CacheModule.register(), SeasonResultsModule],
		})
			.overrideProvider(getModelToken(SeasonResultsModel.name))
			.useValue({})
			.overrideInterceptor(CacheInterceptor)
			.useClass(MockCacheInterceptor)
			.compile();
	});

	it("should compile the module", () => {
		expect(moduleRef).toBeDefined();
	});

	it("should have SeasonResultsService provider", () => {
		const service = moduleRef.get<SeasonResultsService>(SeasonResultsService);
		expect(service).toBeInstanceOf(SeasonResultsService);
	});

	it("should have SeasonResultsController controller", () => {
		const controller = moduleRef.get<SeasonResultsController>(
			SeasonResultsController,
		);
		expect(controller).toBeInstanceOf(SeasonResultsController);
	});

	it("should register the SeasonResultsModel schema", () => {
		const model = moduleRef.get(getModelToken(SeasonResultsModel.name));
		expect(model).toBeDefined();
	});
});
