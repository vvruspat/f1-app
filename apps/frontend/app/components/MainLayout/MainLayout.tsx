import type { PropsWithChildren } from "react";
import { Header } from "../Header";
import { redirect } from "next/navigation";
import styles from "./MainLayout.module.css";
import { MFlex } from "@repo/uikit";

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
		const server = process.env.NEXT_WEB_API_URL;

		const res = await fetch(`${server}/seasons`);

		if (!res.ok) {
			redirect("/500");
		}
		const seasons = await res.json();

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
