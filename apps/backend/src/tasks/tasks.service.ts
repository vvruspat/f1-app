import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ErgastService } from "../ergast/ergast.service";

@Injectable()
export class TasksService {
	private readonly logger = new Logger(TasksService.name);

	constructor(private readonly ergastService: ErgastService) {}

	@Cron("0 0 * * *")
	async handleCron() {
		this.logger.debug("Called when the current second is 45");
		await this.ergastService.syncSeasons();
	}
}
