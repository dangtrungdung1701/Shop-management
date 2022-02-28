/**
 * This is component which will prevent your app is cracked when something wrong
 * with typescript.
 * This component is similar with try-catch wrapper
 */

import { Component, ErrorInfo, isValidElement, ReactNode } from "react";

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface IErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return isValidElement(this.props.fallback) ? (
        this.props.fallback
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-primary-1-1">
            An error occurred!
          </h2>
          <details className="whitespace-pre-wrap ">
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
