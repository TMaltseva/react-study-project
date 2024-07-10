import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ThrowErrorButton from './components/ErrorButton';
import { fetchData } from './services/apiService';
import { SearchResult } from './components/SearchResults';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSearch(localStorage.getItem('searchTerm') || '');
  }, []);

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    const results = await fetchData(searchTerm);
    setResults(results);
    setLoading(false);
  };

  return (
    <main className="sections-wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="top-section">
                <SearchBar onSearch={handleSearch} />
                <ThrowErrorButton />
              </div>
              <div className="bottom-section">{loading ? <p>Loading...</p> : <SearchResults results={results} />}</div>
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
