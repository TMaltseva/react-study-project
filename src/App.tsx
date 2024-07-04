import { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ThrowErrorButton from './components/ErrorButton';
import { fetchData } from './services/apiService';
import { AppState } from './types/AppInterface';

export default class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { results: [], loading: false, hasError: false };
  }

  componentDidMount() {
    this.handleSearch(localStorage.getItem('searchTerm') || '');
  }

  handleSearch = async (searchTerm: string) => {
    this.setState({ loading: true });
    const results = await fetchData(searchTerm);
    this.setState({ results, loading: false });
  };

  handleError = () => {
    this.setState({ hasError: true });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="top-section">
          <SearchBar onSearch={this.handleSearch} />
          <ThrowErrorButton onError={this.handleError} />
        </div>
        <div className="bottom-section">
          {this.state.loading ? <p>Loading...</p> : <SearchResults results={this.state.results} />}
        </div>
      </ErrorBoundary>
    );
  }
}
