import { Component } from 'react';
import { AppState } from './types/AppInterface';
export default class App extends Component<Record<string, never>, AppState> {
    constructor(props: Record<string, never>);
    componentDidMount(): void;
    handleSearch: (searchTerm: string) => Promise<void>;
    handleError: () => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
