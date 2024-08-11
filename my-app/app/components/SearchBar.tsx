import React, { useState, useEffect } from 'react';

interface SearchProps {
  onSearch: (term: string, page: number) => void;
}

const useSearchTerm = () => {
  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('searchTerm') || '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchTerm', searchTerm);
    }
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useSearchTerm();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchTerm', trimmedSearchTerm);
    }
    onSearch(trimmedSearchTerm, 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <label htmlFor="search-input">Search:</label>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-label="Search input"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
