import { MBadge, MDivider, MFlex, MHeading, MLinkButton } from "@repo/uikit";
import Link from "next/link";
import type { Options } from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/esm/styles/hljs/dark";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import ts from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("json", json);

export const getMarkdownOptions = (): Readonly<Options> => {
	return {
		components: {
			a: (props) => {
				return (
					<MLinkButton
						mode="transparent"
						size="l"
						linkComponent={Link}
						href={props.href ?? ""}
						target={props.popoverTarget}
						style={{
							textDecoration: "underline",
							color: "var(--text-secondary)",
						}}
					>
						{props.children}
					</MLinkButton>
				);
			},
			h1: (props) => <MHeading mode="h1">{props.children}</MHeading>,
			h2: (props) => <MHeading mode="h2">{props.children}</MHeading>,
			h3: (props) => <MHeading mode="h3">{props.children}</MHeading>,
			h4: (props) => <MHeading mode="h4">{props.children}</MHeading>,
			h5: (props) => <MHeading mode="h5">{props.children}</MHeading>,
			h6: (props) => <MHeading mode="h6">{props.children}</MHeading>,
			ol: (props) => (
				<MFlex
					direction="column"
					align="stretch"
					justify="start"
					gap="s"
					style={{ padding: "0 var(--whiteSpace-general-2x)" }}
				>
					{props.children}
				</MFlex>
			),
			ul: (props) => (
				<MFlex
					direction="column"
					align="stretch"
					justify="start"
					gap="s"
					style={{ padding: "0 var(--whiteSpace-general-2x)", flex: "1 100%" }}
				>
					{props.children}
				</MFlex>
			),
			li: (props) => (
				<MFlex direction="row" align="center" justify="start" gap="xs">
					- {props.children}
				</MFlex>
			),
			code: ({ className, children, ...props }) => {
				const match = /language-(\w+)/.exec(className || "");
				const language = match ? match[1] : undefined;
				const codeString = Array.isArray(children)
					? children.join("")
					: typeof children === "string"
						? children
						: "";

				return (
					<SyntaxHighlighter
						style={dark}
						customStyle={{ margin: 0, borderRadius: "var(--border-radius-s)" }}
						language={language}
					>
						{codeString}
					</SyntaxHighlighter>
				);
			},
			pre: (props) => props.children,
			img: (props) => {
				if (!props.src || typeof props.src !== "string") {
					return null;
				}

				return (
					<a
						href={`/md-docs/${props.src}`}
						target="_blank"
						style={{ display: "block", maxWidth: "100%" }}
						rel="noreferrer"
					>
						<img
							src={`/md-docs/${props.src}`}
							alt={props.alt ?? ""}
							style={{
								maxWidth: "100%",
								height: "auto",
								borderRadius: "var(--border-radius-m)",
							}}
						/>
					</a>
				);
			},
			hr: () => <MDivider />,
		},
		urlTransform: (url) => {
			return url.replace(".md", "");
		},
	};
};
