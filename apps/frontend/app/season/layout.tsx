import type { Metadata } from "next";
import "@repo/uikit/styles/index.css";
import { MainLayout } from "../components/MainLayout";
import { cookies } from "next/headers";

type Props = {
	params: Promise<{ season: string }>;
};

export default async function RootLayout({
	params,
	children,
}: Readonly<
	{
		children: React.ReactNode;
	} & Props
>) {
	const { season } = await params;
	const cookieStore = await cookies();
	const currentTheme = cookieStore.get("theme")?.value;

	return (
		<MainLayout
			currentSeason={season}
			currentTheme={currentTheme === "dark" ? "dark" : "light"}
		>
			{children}
		</MainLayout>
	);
}
