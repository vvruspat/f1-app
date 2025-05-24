"use client";

import React, {
	type MouseEvent,
	type KeyboardEvent,
	type ReactNode,
	useId,
	useMemo,
	useRef,
} from "react";
import clsx from "clsx";
import MFlex from "../MFlex/MFlex";
import MLabel from "../MLabel/MLabel";
import MFieldDescription from "../MFieldDescription/MFieldDescription";
import type { BasicInputProps } from "../../types/BasicInputProps";

import styles from "./MCheckbox.module.css";
import "./MCheckbox.vars.css";
import { MIconCheck } from "../MIcon/icons/MIconCheck";

type CheckboxProps = BasicInputProps & {
	label: ReactNode;
	description?: ReactNode;
	wrapperClassName?: string;
	footerClassName?: string;
	icon?: ReactNode;
};

export const MCheckbox = ({
	id,
	name,
	status = "regular",
	label,
	disabled = false,
	description,
	checked,
	wrapperClassName,
	footerClassName,
	icon,
	...restProps
}: CheckboxProps) => {
	const uuid = useId();
	const fieldId = useMemo(() => id ?? uuid, [uuid, id]);
	const checkboxRef = useRef<HTMLInputElement>(null);

	const setFocus = () => {
		if (checkboxRef.current) {
			checkboxRef.current.focus();
		}
	};

	const onCheckboxClick = (e: MouseEvent<HTMLDivElement>) => {
		setFocus();
	};

	const onCheckboxKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			setFocus();
		}
	};

	return (
		<div
			className={clsx(styles.checkboxWrapper, styles[status], wrapperClassName)}
			onClick={onCheckboxClick}
			onKeyUp={onCheckboxKeyUp}
		>
			<MFlex className={clsx(styles.checkboxContainer)}>
				<input
					type="checkbox"
					ref={checkboxRef}
					className={clsx(styles.Checkbox)}
					id={fieldId}
					name={name}
					disabled={disabled}
					{...restProps}
				/>

				<MLabel htmlFor={fieldId}>{label}</MLabel>
				<span className={clsx(styles.customCheckboxIcon)}>
					{icon ? (
						icon
					) : (
						<MIconCheck
							mode="bold"
							width={10}
							color={status === "invalid" ? "#dc2020" : "#ffffff"}
						/>
					)}
				</span>
			</MFlex>
			<div className={footerClassName}>
				{description && (
					<MFieldDescription status={status}>{description}</MFieldDescription>
				)}
			</div>
		</div>
	);
};

export default MCheckbox;
