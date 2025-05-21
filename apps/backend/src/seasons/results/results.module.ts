import { Module } from "@nestjs/common";
import { SeasonResultsController } from "./results.controller";
import { SeasonResultsService } from "./results.service";

@Module({
	imports: [],
	controllers: [SeasonResultsController],
	providers: [SeasonResultsService],
})
export class SeasonResultsModule {}
