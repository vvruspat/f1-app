// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from "@sentry/nestjs";

Sentry.init({
	dsn: "https://f253407ae8ba763d112cb5e7aced3dc7@o1062861.ingest.us.sentry.io/4509420978438144",

	// Setting this option to true will send default PII data to Sentry.
	// For example, automatic IP address collection on events
	sendDefaultPii: true,
});
