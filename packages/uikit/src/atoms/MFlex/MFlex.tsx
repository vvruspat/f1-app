import React, { type ComponentProps } from "react";
import clsx from "clsx";
import styles from "./MFlex.module.css";

export type MFlexProps = ComponentProps<"div"> & {
	as?: "div" | "section" | "article" | "nav" | "aside";
	gap?: "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "none";
	direction?: "row" | "column" | "row-reverse" | "column-reverse";
	align?: "normal" | "start" | "center" | "end" | "stretch";
	justify?:
		| "normal"
		| "start"
		| "center"
		| "end"
		| "space-between"
		| "space-around"
		| "stretch";
	wrap?: "wrap" | "nowrap";
};

export const MFlex = ({
	as = "div",
	children,
	className,
	style = {},
	gap = "s",
	direction = "row",
	align = "center",
	justify = "start",
	wrap = "wrap",
	...restProps
}: MFlexProps) => {
	return React.createElement(
		as,
		{
			className: clsx(styles.flex, styles[`flex-gap-${gap}`], className),
			style: {
				flexDirection: direction,
				alignItems: align,
				justifyContent: justify,
				flexWrap: wrap,
				...style,
			},
			...restProps,
		},
		children,
	);
};

export default MFlex;
