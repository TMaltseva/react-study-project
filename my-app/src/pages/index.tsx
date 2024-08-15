import React from 'react';
import { GetServerSideProps } from 'next';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import store from '@/store/store';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import ErrorButton from '../components/ErrorButton';
import Pagination from '../components/Pagination';
import DetailsWrapper from '../components/DetailsWrapper';
import ThemeToggleButton from '../components/ThemeToggleButton';
import Flyout from '../components/Flyout';
import { Person } from '../services/api';

interface AppProps {
  swResponse: {
    results: Person[];
    totalPages: number;
  } | null;
  page: number;
}

const App: React.FC<AppProps> = ({ swResponse, page }) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const handleSearch = (term: string, page: number = 1) => {
    router.push({
      pathname: '/',
      query: { page: page.toString(), search: term },
    });
  };

  const handlePageChange = (page: number) => {
    router.push({
      pathname: '/',
      query: { page: page.toString(), search: (router.query.search as string) || '' },
    });
  };

  const handleItemClick = (id: string) => {
    setSelectedId(id);
  };

  const handleCloseDetails = () => {
    setSelectedId(null);
  };

  return (
    <Provider store={store}>
      <main className="sections-wrapper">
        <div className="top-section">
          <SearchBar onSearch={(term) => handleSearch(term, 1)} />
          <ErrorButton />
          <ThemeToggleButton />
          <Flyout />
        </div>
        <div className="bottom-section">
          <div className="left-section">
            {swResponse?.results.length === 0 ? (
              <p>Nothing found</p>
            ) : (
              <SearchResults results={swResponse?.results || []} onItemClick={handleItemClick} />
            )}
          </div>
          <div className="right-section">
            {selectedId && <DetailsWrapper id={selectedId} onClose={handleCloseDetails} />}
          </div>
        </div>
        {swResponse?.results.length ? (
          <Pagination currentPage={page} totalPages={swResponse?.totalPages || 0} onPageChange={handlePageChange} />
        ) : null}
      </main>
    </Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchTerm = (context.query.search as string) || '';
  const page = parseInt((context.query.page as string) || '1', 10);

  try {
    const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`);
    const data = await response.json();

    return {
      props: {
        swResponse: {
          results: data.results || [],
          totalPages: Math.ceil(data.count / 10),
        },
        page,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        swResponse: {
          results: [],
          totalPages: 0,
        },
        page,
      },
    };
  }
};

export default App;
