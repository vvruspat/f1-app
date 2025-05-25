import { useCallback } from "react";
import countries from "./flag-icons/country.json";
import nationalities from "./nationality-to-country.json";
import type { Country, Nationality } from "./types";

export const useCountry = () => {
	const getCountryByName = useCallback((name: Country) => {
		return countries.find((country) => country.name === name);
	}, []);

	const getCountryByNationality = useCallback(
		(name: Nationality) => {
			const nationalityCountry = nationalities.find(
				(nationality) => nationality.Nationality === name,
			);

			if (nationalityCountry) {
				return getCountryByName(nationalityCountry.Country);
			}
		},
		[getCountryByName],
	);

	return {
		getCountryByName,
		getCountryByNationality,
	};
};
