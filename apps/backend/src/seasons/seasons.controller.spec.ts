import { Test, type TestingModule } from "@nestjs/testing";
import { SeasonsController } from "./seasons.controller";
import { SeasonsService } from "./seasons.service";

describe("SeasonsController", () => {
	let seasonsController: SeasonsController;

	beforeEach(async () => {
		const seasons: TestingModule = await Test.createTestingModule({
			controllers: [SeasonsController],
			providers: [SeasonsService],
		}).compile();

		seasonsController = seasons.get<SeasonsController>(SeasonsController);
	});

	describe("root", () => {
		it('should return "Hello World!"', () => {
			expect(seasonsController.getHello()).toBe("Hello World!");
		});
	});
});
