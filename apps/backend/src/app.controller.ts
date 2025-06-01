import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiTags("Health Check")
	getHealthCheck(): string {
		return this.appService.getHealthCheck();
	}
}
