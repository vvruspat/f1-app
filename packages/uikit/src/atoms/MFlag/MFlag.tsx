import { useMemo } from "react";
import cn from "clsx";

import "./flag-icons/css/flag-icons.css";
import s from "./MFlag.module.css";
import { useCountry } from "./useCountry";
import type { Country, Nationality } from "./types";

type MFlagProps = {
	/** Flag */
	size?: "s" | "m" | "l";
	/** Country name from API */
	country?: Country;
	/** Nationality name from API */
	nationality?: Nationality;
};

/**
 * Flag component
 */
export const MFlag = ({ size = "s", country, nationality }: MFlagProps) => {
	const { getCountryByNationality, getCountryByName } = useCountry();

	const code = useMemo(() => {
		if (nationality) return getCountryByNationality(nationality)?.code;
		if (country) return getCountryByName(country)?.code;
	}, [country, getCountryByName, getCountryByNationality, nationality]);

	return (
		<div
			className={cn(s.flag, s[`flag_${size}`], "fi", `fi-${code}`)}
			data-testid="flag"
		/>
	);
};
