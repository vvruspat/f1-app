import type { ISOString } from "./ISOString";

export interface Driver {
  driverId: string;
  permanentNumber: number;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: ISOString;
  nationality: string;
}
