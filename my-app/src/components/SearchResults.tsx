import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addItem, removeItem } from '../services/selectedItemsSlice';
import { Person } from '../services/api';

export interface SearchResult extends Person {
  name: string;
  url: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onItemClick: (id: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onItemClick }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);

  const handleCheckboxChange = (result: SearchResult) => {
    const isSelected = selectedItems.some((item: SearchResult) => item.url === result.url);
    if (isSelected) {
      dispatch(removeItem(result.url));
    } else {
      dispatch(addItem(result));
    }
  };

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
        const isSelected = selectedItems.some((item: SearchResult) => item.url === result.url);
        return (
          <div className="bottom-section-element" key={index}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleCheckboxChange(result)}
              aria-label={`Select ${result.name}`}
            />
            <h2
              onClick={() => {
                if (id) {
                  onItemClick(id);
                }
              }}
            >
              {result.name}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
