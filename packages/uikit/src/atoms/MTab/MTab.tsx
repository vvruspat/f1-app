import type React from "react";
import type { ReactNode, KeyboardEvent } from "react";
import clsx from "clsx";
import styles from "./MTab.module.css";
import "./MTab.vars.css";

export interface MTabProps {
	key: string;
	label: string;
	active?: boolean;
	onClick?: () => void;
	content?: ReactNode;
	disabled?: boolean;
	before?: ReactNode;
	after?: ReactNode;
}

export const MTab: React.FC<MTabProps> = ({
	label,
	active,
	onClick,
	disabled,
	before,
	after,
}) => {
	const onTabSelect = () => {
		!disabled && onClick && onClick();
	};

	const onTabKeyUp = (e: KeyboardEvent<HTMLLIElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			onTabSelect();
		}
	};

	return (
		<li
			aria-selected={active}
			aria-disabled={disabled}
			className={clsx(styles.tab, {
				[styles.activeTab]: active,
				[styles.disabledTab]: disabled,
			})}
			onClick={onTabSelect}
			onKeyUp={onTabKeyUp}
		>
			{before && <span>{before}</span>}
			{label}
			{after && <span>{after}</span>}
		</li>
	);
};

export default MTab;
