import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Season } from "@repo/types";
import type { HydratedDocument } from "mongoose";

@Schema()
export class SeasonModel implements Season {
	@Prop({ required: true })
	season: string;

	@Prop()
	url: string;
}

export type SeasonDocument = HydratedDocument<SeasonModel>;
export const SeasonSchema = SchemaFactory.createForClass(SeasonModel);
