import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SeasonsModule } from "./seasons/seasons.module";
import { ErgastModule } from "./ergast/ergast.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { CacheableMemory } from "cacheable";
import KeyvRedis from "@keyv/redis";
import { Keyv } from "keyv";

@Module({
	imports: [
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
							store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
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
		ErgastModule,
		SeasonsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
