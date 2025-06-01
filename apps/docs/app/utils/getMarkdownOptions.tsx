import { MBadge, MFlex, MHeading, MLinkButton } from "@repo/uikit";
import Link from "next/link";
import type { Options } from "react-markdown";

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
					gap="m"
					style={{ padding: "var(--whiteSpace-general-2x)" }}
				>
					{props.children}
				</MFlex>
			),
			ul: (props) => (
				<MFlex
					direction="column"
					align="stretch"
					justify="start"
					gap="m"
					style={{ padding: "var(--whiteSpace-general-2x)" }}
				>
					{props.children}
				</MFlex>
			),
			li: (props) => (
				<MFlex direction="row" align="center" justify="start" gap="xs">
					- {props.children}
				</MFlex>
			),
			code: (props) => (
				<MBadge
					mode="secondary"
					style={{
						borderRadius: "var(--border-radius-s)",
						padding:
							"var(--whiteSpace-general-_25x) var(--whiteSpace-general-1x)",
					}}
				>
					{props.children}
				</MBadge>
			),
			pre: (props) => (
				<pre {...props} style={{ margin: 0 }}>
					{props.children}
				</pre>
			),
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
		},
		urlTransform: (url) => {
			return url.replace(".md", "");
		},
	};
};
