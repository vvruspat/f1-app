import type { PropsWithChildren } from "react";
import { Header } from "../Header";
import { redirect } from "next/navigation";
import styles from "./MainLayout.module.css";
import { MFlex } from "@repo/uikit";
import { getSeasonsAction } from "../../actions/getSeasonsAction";

type MainLayoutProps = PropsWithChildren<{
	currentSeason?: string;
	currentTheme: "light" | "dark";
}>;

export const MainLayout = async ({
	children,
	currentSeason,
	currentTheme,
}: MainLayoutProps) => {
	try {
		const { data: seasons, error } = await getSeasonsAction();

		if (!seasons || error) throw Error(error ?? "Unknown error");

		return (
			<MFlex
				direction="column"
				justify="start"
				align="stretch"
				gap="3xl"
				className={styles.container}
			>
				<Header
					className={styles.header}
					seasons={seasons}
					currentSeason={currentSeason}
					currentTheme={currentTheme}
				/>
				<main className={styles.main}>{children}</main>
			</MFlex>
		);
	} catch (e) {
		redirect("/error");
	}
};
