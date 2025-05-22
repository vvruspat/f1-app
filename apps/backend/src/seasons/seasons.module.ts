import { Module } from "@nestjs/common";
import { SeasonsController } from "./seasons.controller";
import { SeasonsService } from "./seasons.service";
import { SeasonResultsModule } from "./results/results.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SeasonModel, SeasonSchema } from "../db/schemas/season.schema";

@Module({
	imports: [
		SeasonResultsModule,
		MongooseModule.forFeature([
			{ name: SeasonModel.name, schema: SeasonSchema },
		]),
	],
	controllers: [SeasonsController],
	providers: [SeasonsService],
})
export class SeasonsModule {}
