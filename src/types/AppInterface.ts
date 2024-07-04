import { SearchResult } from './SearchResultsInterfaces';

export interface AppState {
  results: SearchResult[];
  loading: boolean;
  hasError: boolean;
}
