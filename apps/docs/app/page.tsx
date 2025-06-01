import path from "node:path";
import fs from "node:fs";
import ReactMarkdown from "react-markdown";
import { getMarkdownOptions } from "./utils/getMarkdownOptions";
import { MFlex } from "@repo/uikit";

export default function Home() {
	const mdPath = path.resolve(process.cwd(), "public/md-docs/overview.md");
	const markdown = fs.readFileSync(mdPath, "utf8");

	return (
		<MFlex direction="column" justify="start" align="stretch" gap="2xl">
			<ReactMarkdown {...getMarkdownOptions()}>{markdown}</ReactMarkdown>
		</MFlex>
	);
}
