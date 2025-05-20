import type { Constructor } from "./constructor";
import type { Driver } from "./driver";
import type { FastestLap } from "./fastestLap";
import type { Time } from "./time";

export interface RaceResult {
	number: string;
	position: string;
	positionText: string;
	points: number;
	Driver: Driver;
	Constructor: Constructor;
	grid: number;
	laps: number;
	status: string;
	Time?: Time;
	FastestLap?: FastestLap;
}
