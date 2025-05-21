import { Module } from "@nestjs/common";
import { SeasonsController } from "./seasons.controller";
import { SeasonsService } from "./seasons.service";
import { SeasonResultsModule } from "./results/results.module";

@Module({
	imports: [SeasonResultsModule],
	controllers: [SeasonsController],
	providers: [SeasonsService],
})
export class SeasonsModule {}
