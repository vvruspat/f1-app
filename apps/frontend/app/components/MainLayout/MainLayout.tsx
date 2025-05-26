import type { PropsWithChildren } from "react";
import { Header } from "../Header";
import { redirect } from "next/navigation";

export const MainLayout = async ({ children }: PropsWithChildren) => {
	const server = process.env.NEXT_WEB_API_URL;

	const res = await fetch(`${server}/seasons`);

	if (!res.ok) {
		redirect("/500");
	}
	const seasons = await res.json();

	return (
		<body>
			<Header seasons={seasons} />
			{children}
		</body>
	);
};
