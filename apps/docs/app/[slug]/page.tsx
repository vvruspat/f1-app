import path from "node:path";
import fs from "node:fs";
import ReactMarkdown from "react-markdown";
import { getMarkdownOptions } from "../utils/getMarkdownOptions";
import { MFlex } from "@repo/uikit";

const options = getMarkdownOptions();

export default async function DocPage({
	params,
}: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug;

	const mdPath = path.resolve(process.cwd(), "public/md-docs", `${slug}.md`);

	let markdown = "";
	try {
		markdown = fs.readFileSync(mdPath, "utf8");
	} catch {
		return <div>Document not found</div>;
	}

	return (
		<MFlex direction="column" justify="start" align="stretch" gap="2xl">
			<ReactMarkdown {...options}>{markdown}</ReactMarkdown>
		</MFlex>
	);
}
