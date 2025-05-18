import type { AverageSpeed } from "./avarageSpeed";
import type { Time } from "./time";

export type FastestLap = {
	rank: number;
	lap: number;
	Time?: Time;
	AverageSpeed: AverageSpeed;
};
