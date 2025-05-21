import { Test, type TestingModule } from "@nestjs/testing";
import { SeasonResultsController } from "./results.controller";
import { SeasonResultsService } from "./results.service";

describe("SeasonResultsController", () => {
	let seasonResultsController: SeasonResultsController;

	beforeEach(async () => {
		const seasonresults: TestingModule = await Test.createTestingModule({
			controllers: [SeasonResultsController],
			providers: [SeasonResultsService],
		}).compile();

		seasonResultsController = seasonresults.get<SeasonResultsController>(
			SeasonResultsController,
		);
	});

	describe("root", () => {
		it('should return "Hello World!"', () => {
			expect(seasonResultsController.getHello()).toBe("Hello World!");
		});
	});
});
