import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { ErgastService } from "../ergast/ergast.service";

describe("TasksService", () => {
    let service: TasksService;
    let ergastService: { syncSeasons: jest.Mock };

    beforeEach(async () => {
        ergastService = { syncSeasons: jest.fn() };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: ErgastService, useValue: ergastService },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should call ergastService.syncSeasons in handleCron", async () => {
        await service.handleCron();
        expect(ergastService.syncSeasons).toHaveBeenCalled();
    });
});