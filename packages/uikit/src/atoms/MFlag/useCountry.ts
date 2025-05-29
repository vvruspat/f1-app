import { useCallback } from "react";
import countries from "./flag-icons/country.json";
import nationalities from "./nationality-to-country.json";
import type { Country, Nationality } from "./types";

export const useCountry = () => {
	const getCountryByName = useCallback((name: Country) => {
		return countries.data
			.find((country) => country.name.toLowerCase() === name.toLowerCase())
			?.code.toLowerCase();
	}, []);

	const getCountryByNationality = useCallback(
		(name: Nationality) => {
			const nationalityCountry = nationalities.data.find(
				(nationality) =>
					nationality.Nationality.toLowerCase() === name.toLowerCase(),
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
