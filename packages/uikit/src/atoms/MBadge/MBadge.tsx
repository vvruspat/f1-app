import React, {
	type DetailedHTMLProps,
	type HTMLAttributes,
	type ReactNode,
} from "react";
import clsx from "clsx";
import styles from "./MBadge.module.css";
import "./MBadge.vars.css";

type BadgeProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	mode: "primary" | "secondary" | "transparent" | "outlined";
	before?: ReactNode;
};

export const MBadge = ({
	children,
	mode = "primary",
	className,
	...restProps
}: BadgeProps) => {
	return (
		<div className={clsx(styles.badge, styles[mode], className)} {...restProps}>
			{children}
		</div>
	);
};

export default MBadge;
