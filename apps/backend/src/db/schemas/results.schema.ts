import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Race, SeasonResults } from "@repo/types";
import type { HydratedDocument } from "mongoose";

@Schema()
export class SeasonResultsModel implements SeasonResults {
	@Prop({ required: true })
	season: string;

	@Prop({ type: Array, required: true })
	Races: Race[];
}

export type SeasonResultsDocument = HydratedDocument<SeasonResultsModel>;
export const SeasonResultsSchema =
	SchemaFactory.createForClass(SeasonResultsModel);
