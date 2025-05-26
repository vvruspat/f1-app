"use client";

import cn from "clsx";

import s from "./MFlag.module.css";
import { useCountry } from "./useCountry";
import type { Country, Nationality } from "./types";
import {
	type ReactNode,
	type ComponentProps,
	useEffect,
	useState,
} from "react";

type MFlagProps = ComponentProps<"div"> & {
	size?: "s" | "m" | "l";
} & (
		| {
				country?: Country;
				nationality?: never;
		  }
		| {
				country?: never;
				nationality?: Nationality;
		  }
	);

/**
 * Flag component
 */
export const MFlag = ({
	size = "s",
	country,
	nationality,
	...divProps
}: MFlagProps) => {
	const [flag, setFlag] = useState<ReactNode>(null);
	const { getCountryByNationality, getCountryByName } = useCountry();

	useEffect(() => {
		(async () => {
			let code: string | undefined = "";
			if (nationality) code = getCountryByNationality(nationality);
			else if (country) code = getCountryByName(country);

			if (code) {
				const icon = (await import(`./flag-icons/flags/${code}.svg`)).default;

				setFlag(icon);
			} else {
				setFlag(null);
			}
		})();
	}, [country, getCountryByName, getCountryByNationality, nationality]);

	return (
		<div
			className={cn(s.flag, s[`flag_${size}`])}
			data-testid="flag"
			{...divProps}
		>
			{flag}
		</div>
	);
};
