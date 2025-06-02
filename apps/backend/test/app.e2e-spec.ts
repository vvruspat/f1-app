import { Test, type TestingModule } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import type { App } from "supertest/types";
import { AppModule } from "./../src/app.module";
import { getConnectionToken } from "@nestjs/mongoose";

const E2E_TEST_TIMEOUT = 30000;

describe("AppController (e2e)", () => {
	let app: INestApplication<App>;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	}, E2E_TEST_TIMEOUT);

	afterAll(async () => {
		try {
			const connection = app.get(getConnectionToken());
			if (connection && connection.readyState === 1) {
				await connection.close(true);
			}
		} catch (e) {
			console.error("Error getting or closing Mongoose connection", e);
		}

		if (app) {
			await app.close();
		}
	}, E2E_TEST_TIMEOUT);

	it("/ (GET)", () => {
		return request(app.getHttpServer()).get("/").expect(200).expect("OK");
	});
});
