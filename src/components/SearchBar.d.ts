import React, { Component } from 'react';
import { SearchProps, SearchState } from '../types/SearchInterfaces';
export default class SearchBar extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps);
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
