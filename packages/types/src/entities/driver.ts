import type { ISOString } from "./ISOString";

export type Driver = {
	driverId: string;
	permanentNumber: number;
	code: string;
	url: string;
	givenName: string;
	familyName: string;
	dateOfBirth: ISOString;
	nationality: string;
};
