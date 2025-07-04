import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SeasonsModule } from "./seasons/seasons.module";
import { ErgastModule } from "./ergast/ergast.module";
import { TasksModule } from "./tasks/tasks.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { CacheableMemory } from "cacheable";
import KeyvRedis from "@keyv/redis";
import { Keyv } from "keyv";
import { SentryModule } from "@sentry/nestjs/setup";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
	imports: [
		SentryModule.forRoot(),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		CacheModule.registerAsync({
			isGlobal: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				return {
					stores: [
						new KeyvRedis(configService.get<string>("REDIS_URI")),
						new Keyv({
							store: new CacheableMemory({
								ttl:
									configService.get<number>("REDIS_TTL") ??
									86400000 /* one day */,
								lruSize: 5000,
							}),
						}),
					],
				};
			},
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>("MONGODB_URI"),
			}),
		}),
		ScheduleModule.forRoot(),
		TasksModule,
		ErgastModule,
		SeasonsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
