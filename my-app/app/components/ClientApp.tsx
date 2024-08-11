'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useFetchPeopleQuery } from '../services/api';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import DetailsWrapper from './DetailsWrapper';
import ThemeToggleButton from './ThemeToggleButton';
import Flyout from './Flyout';

const ClientApp: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchTerm = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { data, isLoading, isFetching } = useFetchPeopleQuery({ searchTerm, page });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSearch = (term: string, page: number = 1) => {
    const params = new URLSearchParams({ page: page.toString(), search: term });
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams({ page: page.toString(), search: searchTerm });
    router.push(`/?${params.toString()}`);
  };

  const handleItemClick = (id: string) => {
    setSelectedId(id);
    const params = new URLSearchParams({ page: page.toString(), search: searchTerm, details: id });
    router.push(`/?${params.toString()}`);
  };

  const handleCloseDetails = () => {
    setSelectedId(null);
    const params = new URLSearchParams({ page: page.toString(), search: searchTerm });
    router.push(`/?${params.toString()}`);
  };

  return (
    <main className="sections-wrapper">
      <div className="top-section">
        <SearchBar onSearch={(term) => handleSearch(term, 1)} />
        <ThemeToggleButton />
        <Flyout />
      </div>
      <div className="bottom-section">
        <div className="left-section">
          {isLoading || isFetching ? (
            <p>Loading...</p>
          ) : (
            <SearchResults results={data?.results || []} onItemClick={handleItemClick} />
          )}
        </div>
        <div className="right-section">
          {selectedId && <DetailsWrapper id={selectedId} onClose={handleCloseDetails} />}
        </div>
      </div>
      {data?.results?.length ? (
        <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={handlePageChange} />
      ) : null}
    </main>
  );
};

export default ClientApp;
