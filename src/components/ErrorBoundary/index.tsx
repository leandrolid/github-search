import { Component, ErrorInfo, ReactNode } from 'react';

import { errorLogger } from '../../services/error/errorLogger';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean,
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    errorLogger(error, errorInfo);

    this.setState({
      hasError: true,
      error
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <pre>{this.state.error?.message}</pre>
          <button onClick={() => this.setState({ ...this.state, hasError: false })}>
            Tente de novo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}