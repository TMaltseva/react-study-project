import { Component } from 'react';
import { SearchResultsProps, SearchResultsState } from '../types/SearchResultsInterfaces';

export default class SearchResults extends Component<SearchResultsProps, SearchResultsState> {
  render() {
    const { results } = this.props;
    return (
      <div className="bottom-section-elements">
        {results.map((result, index) => (
          <div className="bottom-section-element" key={index}>
            <h2>{result.name}</h2>
            <p>Height: {result.height}</p>
            <p>Mass: {result.mass}</p>
            <p>Hair Color: {result.hair_color}</p>
            <p>Skin Color: {result.skin_color}</p>
            <p>Eye Color: {result.eye_color}</p>
            <p>Birth Year: {result.birth_year}</p>
            <p>Gender: {result.gender}</p>
          </div>
        ))}
      </div>
    );
  }
}
