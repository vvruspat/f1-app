import { Test, type TestingModule } from "@nestjs/testing";
import { AppModule } from "./app.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { getModelToken } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

jest.mock("@nestjs/cache-manager", () => {
	class DummyCacheModule {}
	return {
		CacheModule: {
			registerAsync: jest.fn().mockReturnValue({
				module: DummyCacheModule,
				global: true,
			}),
		},
		CacheInterceptor: class {},
		CacheTTL: () => () => {},
	};
});

jest.mock("cacheable", () => ({
	CacheableMemory: class {},
}));

jest.mock("keyv", () => class {});

jest.mock("@sentry/nestjs", () => {
	class DummySentryModule {}
	return {
		SentryModule: {
			forRoot: jest.fn().mockReturnValue({
				module: DummySentryModule,
			}),
		},
	};
});

jest.mock("@nestjs/mongoose", () => {
	const actual = jest.requireActual("@nestjs/mongoose");

	class DummyModuleForForFeature {}

	// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
	class MockMongooseModule {
		static forRootAsync = jest.fn().mockReturnValue({
			module: MockMongooseModule,
		});

		static forFeature = jest.fn(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(models: Array<{ name: string; schema: any }>) => {
				const modelProviders = models.map((modelDef) => ({
					provide: actual.getModelToken(modelDef.name),
					useValue: `mock_placeholder_for_${modelDef.name}`,
				}));
				const modelExports = models.map((modelDef) =>
					actual.getModelToken(modelDef.name),
				);

				return {
					module: DummyModuleForForFeature,
					providers: modelProviders,
					exports: modelExports,
				};
			},
		);
	}

	return {
		...actual,
		MongooseModule: MockMongooseModule,
		getModelToken: actual.getModelToken,
	};
});

describe("AppModule", () => {
	let moduleRef: TestingModule;

	beforeAll(async () => {
		moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideProvider(getModelToken("SeasonModel"))
			.useValue({})
			.overrideProvider(getModelToken("SeasonResultsModel"))
			.useValue({})
			.overrideProvider(ConfigService)
			.useValue({ get: jest.fn() })
			.compile();
	});

	it("should compile the module", () => {
		expect(moduleRef).toBeDefined();
	});

	it("should provide AppService", () => {
		const service = moduleRef.get<AppService>(AppService);
		expect(service).toBeInstanceOf(AppService);
	});

	it("should provide AppController", () => {
		const controller = moduleRef.get<AppController>(AppController);
		expect(controller).toBeInstanceOf(AppController);
	});
});
