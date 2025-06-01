import { Controller, Get } from "@nestjs/common";
// biome-ignore lint/style/useImportType: service should be imported in js bundle
import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHealthCheck(): string {
		return this.appService.getHealthCheck();
	}
}
