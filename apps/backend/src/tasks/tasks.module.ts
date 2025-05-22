import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { ErgastService } from "./ergast.service";
import { MongooseModule } from "@nestjs/mongoose";
import { SeasonModel, SeasonSchema } from "../db/schemas/season.schema";
import {
	SeasonResultsModel,
	SeasonResultsSchema,
} from "../db/schemas/results.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: SeasonModel.name, schema: SeasonSchema },
			{ name: SeasonResultsModel.name, schema: SeasonResultsSchema },
		]),
	],
	controllers: [],
	providers: [TasksService, ErgastService],
})
export class TasksModule {}
