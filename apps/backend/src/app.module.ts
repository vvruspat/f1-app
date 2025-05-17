import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./db";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: "postgres",
				host: process.env.DB_HOST,
				port: +(process.env.DB_PORT ?? 0),
				username: process.env.DB_USER,
				password: process.env.DB_PASS,
				database: process.env.DB_NAME,
				entities: [User],
				synchronize: false,
			}),
		}),
		TypeOrmModule.forFeature([User]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
