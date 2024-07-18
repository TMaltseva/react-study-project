import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface SearchResult {
  name: string;
  url: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onItemClick: (id: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onItemClick }) => {
  const navigate = useNavigate();

  const extractIdFromUrl = (url: string) => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : null;
  };

  if (results.length === 0) {
    return <p>Nothing found</p>;
  }

  return (
    <div className="bottom-section-elements">
      {results.map((result, index) => {
        const id = extractIdFromUrl(result.url);
        return (
          <div
            className="bottom-section-element"
            key={index}
            onClick={() => {
              if (id) {
                onItemClick(id);
                navigate(`/details/${id}`);
              }
            }}
          >
            <h2>{result.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
