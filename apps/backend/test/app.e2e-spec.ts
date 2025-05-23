import { Test, type TestingModule } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import type { App } from "supertest/types";
import { AppModule } from "./../src/app.module";
import { getConnectionToken } from "@nestjs/mongoose";

describe("AppController (e2e)", () => {
	let app: INestApplication<App>;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		try {
			const connection = app.get(getConnectionToken());
			await connection.close();
		} catch (e) {
			// ignore if not using mongoose or already closed
			console.error("Error closing connection", e);
		}
		await app.close();
	});

	it("/ (GET)", () => {
		return request(app.getHttpServer()).get("/").expect(200).expect("OK");
	});
});
