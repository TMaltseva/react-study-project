import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ErrorButton from './components/ErrorButton';
import { fetchData } from './services/fetchData';
import { SearchResult } from './components/SearchResults';
import NotFound from './components/NotFound';
import Pagination from './components/Pagination';
import CardDetails from './components/CardDetails';

const App: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    async (searchTerm: string, page: number = 1) => {
      setLoading(true);
      setCurrentPage(page);
      setSearchParams({ page: page.toString(), search: searchTerm, details: selectedId || '' });
      try {
        const results = await fetchData(searchTerm, page);
        setResults(results.items);
        setTotalPages(results.totalPages);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    },
    [setSearchParams, selectedId],
  );

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const searchTerm = searchParams.get('search') || '';
    const detailsId = searchParams.get('details');

    if (page > 0) {
      setCurrentPage(page);
      handleSearch(searchTerm, page);
    }

    if (detailsId) {
      setSelectedId(detailsId);
    }
  }, [searchParams, handleSearch]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString(), search: searchParams.get('search') || '', details: selectedId || '' });
  };

  const handleItemClick = (id: string) => {
    setSelectedId(id);
    setSearchParams({ page: currentPage.toString(), search: searchParams.get('search') || '', details: id });
  };

  const handleCloseDetails = () => {
    setSelectedId(null);
    setSearchParams({ page: currentPage.toString(), search: searchParams.get('search') || '' });
  };

  return (
    <main className="sections-wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="top-section">
                <SearchBar onSearch={(term) => handleSearch(term, 1)} />
                <ErrorButton />
              </div>
              <div className="bottom-section">
                <div className="left-section">
                  {loading ? <p>Loading...</p> : <SearchResults results={results} onItemClick={handleItemClick} />}
                </div>
                {selectedId && (
                  <div className="right-section">
                    <button onClick={handleCloseDetails}>Close</button>
                    <CardDetails id={selectedId} />
                  </div>
                )}
              </div>
              {results.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              )}
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
