import { Component, ErrorInfo } from 'react';
import { Props, State } from '../types/ErrorBoundaryInterfaces';
export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props);
    static getDerivedStateFromError(): State;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    handleGoToSearch: () => void;
    render(): string | number | boolean | import("react/jsx-runtime").JSX.Element | Iterable<import("react").ReactNode> | null | undefined;
}
