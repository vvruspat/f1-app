import type React from "react";
import { Component, type ReactNode } from "react";

type Props = {
	children: ReactNode;
};

type State = {
	hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
	state: State = {
		hasError: false,
	};

	static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h2>Something went wrong.</h2>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
