import countries from "./flag-icons/country.json";
import nationalities from "./nationality-to-country.json";

// List of all country names
export const countryNames = (countries.data as { name: string }[]).map(
	(c) => c.name,
);
// Union type of all country names
export type Country = (typeof countryNames)[number];

// List of all nationalities
export const nationalityNames = (
	nationalities.data as { Nationality: string }[]
).map((n) => n.Nationality);
// Union type of all nationalities
export type Nationality = (typeof nationalityNames)[number];
