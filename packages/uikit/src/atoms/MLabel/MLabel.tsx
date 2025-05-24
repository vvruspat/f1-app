import type React from "react";
import type { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import MText from "../MText/MText";
import "./MLabel.vars.css";
import styles from "./MLabel.module.css";
import type { TComponentStatus } from "../../types/TComponentStatus";
import { MFlex } from "../MFlex";

type LabelProps = ComponentProps<"label"> &
	Partial<TComponentStatus> & {
		after?: ReactNode;
		before?: ReactNode;
	};

export const MLabel = ({
	children,
	className,
	before,
	after,
	status = "regular",
	...restProps
}: LabelProps) => {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: This is generic component, input will be a children inside
		<label
			className={clsx(styles.label, styles[status], className)}
			{...restProps}
		>
			<MFlex direction="row" gap="xs" align="start" justify="start">
				{before}
				<MText as="div" size="l">
					{children}
				</MText>
				{after}
			</MFlex>
		</label>
	);
};

export default MLabel;
