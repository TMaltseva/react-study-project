import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useSearchParams, Outlet } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ErrorButton from './components/ErrorButton';
import { fetchData } from './services/fetchData';
import { SearchResult } from './components/SearchResults';
import NotFound from './components/NotFound';
import Pagination from './components/Pagination';
import DetailsWrapper from './components/DetailsWrapper';

const App: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    async (searchTerm: string, page: number = 1) => {
      setLoading(true);
      setCurrentPage(page);
      setSearchParams({ page: page.toString(), search: searchTerm });
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
    [setSearchParams],
  );

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const searchTerm = searchParams.get('search') || '';

    if (page > 0) {
      setCurrentPage(page);
      handleSearch(searchTerm, page);
    }
  }, [searchParams, handleSearch]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString(), search: searchParams.get('search') || '' });
  };

  const handleItemClick = (id: string) => {
    setSearchParams({ page: currentPage.toString(), search: searchParams.get('search') || '', details: id });
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
                <Outlet />
              </div>
              {results.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              )}
            </>
          }
        >
          <Route path="details/:id" element={<DetailsWrapper />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
