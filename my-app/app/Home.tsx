'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFetchPeopleQuery } from '../services/api';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import ErrorButton from '../components/ErrorButton';
import Pagination from '../components/Pagination';
import DetailsWrapper from '../components/DetailsWrapper';
import ThemeToggleButton from '../components/ThemeToggleButton';
import Flyout from '../components/Flyout';

const Home: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
  };

  const handleCloseDetails = () => {
    setSelectedId(null);
  };

  return (
    <main className="sections-wrapper">
      <div className="top-section">
        <SearchBar onSearch={(term) => handleSearch(term, 1)} />
        <ErrorButton />
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

export default Home;
