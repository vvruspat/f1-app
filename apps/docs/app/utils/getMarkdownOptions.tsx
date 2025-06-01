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
				<MFlex direction="row" align="center" justify="start" gap="s">
					{props.children}
				</MFlex>
			),
			code: (props) => (
				<MBadge
					mode="secondary"
					style={{ borderRadius: "var(--border-radius-s)" }}
				>
					{props.children}
				</MBadge>
			),
			pre: (props) => (
				<pre {...props} style={{ margin: 0 }}>
					{props.children}
				</pre>
			),
		},
		urlTransform: (url) => {
			return url.replace(".md", "");
		},
	};
};
