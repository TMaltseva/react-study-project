import React, { useCallback } from 'react';
import { Routes, Route, useSearchParams, Outlet } from 'react-router-dom';
import { useFetchPeopleQuery } from './services/api';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ErrorButton from './components/ErrorButton';
import NotFound from './components/NotFound';
import Pagination from './components/Pagination';
import DetailsWrapper from './components/DetailsWrapper';
import ThemeToggleButton from './components/ThemeToggleButton';
const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { data, isLoading } = useFetchPeopleQuery({ searchTerm, page });

  const handleSearch = useCallback(
    (term: string, page: number = 1) => {
      setSearchParams({ page: page.toString(), search: term });
    },
    [setSearchParams],
  );

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString(), search: searchParams.get('search') || '' });
  };

  const handleItemClick = (id: string) => {
    setSearchParams({ page: page.toString(), search: searchParams.get('search') || '', details: id });
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
                <ThemeToggleButton />
              </div>
              <div className="bottom-section">
                <div className="left-section">
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <SearchResults results={data?.results || []} onItemClick={handleItemClick} />
                  )}
                </div>
                <Outlet />
              </div>
              {data?.results?.length ? (
                <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={handlePageChange} />
              ) : null}
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
