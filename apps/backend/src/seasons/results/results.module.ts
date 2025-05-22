import { Module } from "@nestjs/common";
import { SeasonResultsController } from "./results.controller";
import { SeasonResultsService } from "./results.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
	SeasonResultsModel,
	SeasonResultsSchema,
} from "../../db/schemas/results.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: SeasonResultsModel.name, schema: SeasonResultsSchema },
		]),
	],
	controllers: [SeasonResultsController],
	providers: [SeasonResultsService],
})
export class SeasonResultsModule {}
