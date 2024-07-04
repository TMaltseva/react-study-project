import { Component, ErrorInfo } from 'react';
import { Props, State } from '../types/ErrorBoundaryInterfaces';

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Uncaught error:', error, errorInfo);
  }

  handleGoToSearch = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={this.handleGoToSearch}>Go Search</button>
        </div>
      );
    }

    return this.props.children;
  }
}
