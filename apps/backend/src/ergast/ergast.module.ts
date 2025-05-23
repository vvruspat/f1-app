import { Module } from "@nestjs/common";
import { ErgastService } from "./ergast.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
	SeasonResultsModel,
	SeasonResultsSchema,
} from "../db/schemas/results.schema";
import { SeasonModel, SeasonSchema } from "../db/schemas/season.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: SeasonModel.name, schema: SeasonSchema },
			{ name: SeasonResultsModel.name, schema: SeasonResultsSchema },
		]),
	],
	controllers: [],
	providers: [ErgastService],
})
export class ErgastModule {}
