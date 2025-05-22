import { Test, type TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { ErgastService } from "./ergast.service";
import { getModelToken } from "@nestjs/mongoose";
import { SeasonModel } from "../db/schemas/season.schema";
import { SeasonResultsModel } from "../db/schemas/results.schema";
import { ConfigService } from "@nestjs/config";

describe("TasksModule", () => {
	let module: TestingModule;

	beforeEach(async () => {
		module = await Test.createTestingModule({
			providers: [
				TasksService,
				ErgastService,
				{ provide: getModelToken(SeasonModel.name), useValue: {} },
				{ provide: getModelToken(SeasonResultsModel.name), useValue: {} },
				{ provide: ConfigService, useValue: { get: jest.fn() } },
			],
		}).compile();
	});

	it("should compile the module", () => {
		expect(module).toBeDefined();
	});

	it("should provide TasksService", () => {
		const service = module.get<TasksService>(TasksService);
		expect(service).toBeInstanceOf(TasksService);
	});

	it("should provide ErgastService", () => {
		const service = module.get<ErgastService>(ErgastService);
		expect(service).toBeInstanceOf(ErgastService);
	});
});
