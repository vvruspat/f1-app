import type React from "react";
import type { ComponentProps } from "react";
import clsx from "clsx";
import styles from "./MButton.module.css";
import { MFlex } from "../../atoms/MFlex";
import type { CommonButtonProps } from "./types";

type LinkButtonProps = ComponentProps<"a"> &
	CommonButtonProps & {
		disabled?: boolean;
		href: string;
		linkComponent?: React.ElementType<ComponentProps<"a"> & { href: string }>;
	};

export const MLinkButton = ({
	children,
	className,
	mode = "primary",
	justify = "center",
	stretch = false,
	size = "m",
	disabled,
	after,
	before,
	linkComponent,
	...restProps
}: LinkButtonProps) => {
	const LinkComponent = linkComponent ?? "a";
	return (
		<LinkComponent
			{...restProps}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			className={clsx(
				styles.button,
				styles.linkButton,
				styles[mode],
				{
					[styles.stretch]: stretch,
					[styles.disabled]: disabled,
				},
				styles[size],
				className,
			)}
		>
			<MFlex
				id="test"
				justify={justify}
				className={clsx(styles.buttonContentWrapper)}
			>
				{before && <span className={styles.before}>{before}</span>}
				<span className={styles.buttonContent}>{children}</span>
				{after && <span className={styles.after}>{after}</span>}
			</MFlex>
		</LinkComponent>
	);
};

export default MLinkButton;
