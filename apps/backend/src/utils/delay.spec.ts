import { delay } from "./delay";

describe("delay", () => {
    it("should resolve after the specified milliseconds", async () => {
        const start = Date.now();
        await delay(100);
        const elapsed = Date.now() - start;
        expect(elapsed).toBeGreaterThanOrEqual(100);
    });
});