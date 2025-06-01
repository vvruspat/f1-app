import path from "node:path";
import fs from "node:fs";
import ReactMarkdown from "react-markdown";

export default function Home() {
	const mdPath = path.resolve(
		process.cwd(),
		"../../packages/md-docs/src/overview.md",
	);
	const markdown = fs.readFileSync(mdPath, "utf8");

	return (
		<div style={{ maxWidth: 800, margin: "0 auto" }}>
			<ReactMarkdown
				components={{
					a: ({ href = "", children, ...props }) => {
						const cleanHref = href.endsWith(".md")
							? href.replace(/\.md$/, "")
							: href;
						return (
							<a href={cleanHref} {...props}>
								{children}
							</a>
						);
					},
				}}
			>
				{markdown}
			</ReactMarkdown>
		</div>
	);
}
