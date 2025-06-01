import type { Metadata } from "next";
import path from "node:path";
import fs from "node:fs";
import ReactMarkdown from "react-markdown";
import { getMarkdownOptions } from "./utils/getMarkdownOptions";
import "@repo/uikit/styles/index.css";
import { MCard, MFlex } from "@repo/uikit";
import styles from "./layout.module.css";

export const metadata: Metadata = {
	title: "Formula 1 World Champions - Documentation",
	description: "Documentation for the Formula 1 World Champions project",
};

const options = getMarkdownOptions();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const mdPath = path.join("../../packages/md-docs/src/index.md");

	let markdown = "";
	try {
		markdown = fs.readFileSync(mdPath, "utf8");
	} catch {
		return <div>Document not found</div>;
	}

	return (
		<html
			lang="en"
			data-platform="desktop"
			data-theme="dark"
			data-brand="f1-app"
		>
			<body>
				<MFlex
					align="stretch"
					justify="stretch"
					direction="row"
					gap="2xl"
					className={styles.container}
				>
					<MCard>
						<aside>
							<nav>
								<ReactMarkdown {...options}>{markdown}</ReactMarkdown>
							</nav>
						</aside>
					</MCard>
					<MCard className={styles.content}>
						<main>{children}</main>
					</MCard>
				</MFlex>
			</body>
		</html>
	);
}
