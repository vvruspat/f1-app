import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SeasonsModule } from "./seasons/seasons.module";
import { ErgastModule } from "./ergast/ergast.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>("MONGODB_URI"),
			}),
		}),
		ErgastModule,
		SeasonsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
