import type { Constructor } from "./constructor";
import type { Driver } from "./driver";
import type { FastestLap } from "./FastestLap";
import type { Time } from "./time";

export type RaceResult = {
	number: string;
	position: string;
	positionText: number;
	points: number;
	Driver: Driver;
	Constructor: Constructor;
	grid: number;
	laps: number;
	status: string;
	Time?: Time;
	FastestLap: FastestLap;
};
