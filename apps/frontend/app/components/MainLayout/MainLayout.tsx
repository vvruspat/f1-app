import type { PropsWithChildren } from "react";
import { Header } from "../Header";
import { redirect } from "next/navigation";

export const MainLayout = async ({ children }: PropsWithChildren) => {
	try {
		const server = process.env.NEXT_WEB_API_URL;

		const res = await fetch(`${server}/seasons`);

		if (!res.ok) {
			redirect("/500");
		}
		const seasons = await res.json();

		return (
			<body>
				<Header seasons={seasons} />
				<main>{children}</main>
			</body>
		);
	} catch (e) {
		redirect("/error");
	}
};
