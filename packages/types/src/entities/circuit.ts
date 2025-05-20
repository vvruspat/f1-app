import type { LocationPos } from "./locationPos";

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: LocationPos;
}
