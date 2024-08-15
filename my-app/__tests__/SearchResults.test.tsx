import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import SearchResults, { SearchResult } from '../src/components/SearchResults';
import { RootState } from '../src/store/store';
import { addItem, removeItem } from '../src/services/selectedItemsSlice';
import { api } from '../src/services/api';
import '@testing-library/jest-dom';

const mockStore = configureStore<RootState>([]);

const initialState: RootState = {
  selectedItems: {
    items: [],
  },
  [api.reducerPath]: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
      reducerPath: 'api',
      online: true,
      focused: true,
      middlewareRegistered: true,
      keepUnusedDataFor: 60,
      invalidationBehavior: 'delayed',
    },
  },
};

const renderWithProviders = (ui: React.ReactElement, { store }: { store: MockStoreEnhanced<RootState> }) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('SearchResults Component', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  const mockResults: SearchResult[] = [
    { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/', height: '', mass: '', hair_color: '', skin_color: '', eye_color: '', birth_year: '', gender: '' },
    { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/', height: '', mass: '', hair_color: '', skin_color: '', eye_color: '', birth_year: '', gender: '' },
  ];

  it('renders "Nothing found" when results are empty', () => {
    renderWithProviders(<SearchResults results={[]} onItemClick={jest.fn()} />, { store });
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders search results', () => {
    renderWithProviders(<SearchResults results={mockResults} onItemClick={jest.fn()} />, { store });
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('handles checkbox change', () => {
    renderWithProviders(<SearchResults results={mockResults} onItemClick={jest.fn()} />, { store });

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalledWith(addItem(mockResults[0]));
  });

  it('handles item click', () => {
    const handleItemClick = jest.fn();
    renderWithProviders(<SearchResults results={mockResults} onItemClick={handleItemClick} />, { store });

    const item = screen.getByText('Luke Skywalker');
    fireEvent.click(item);

    expect(handleItemClick).toHaveBeenCalledWith('1');
  });

  it('toggles checkbox state', () => {
    const selectedState: RootState = {
      selectedItems: {
        items: [mockResults[0]],
      },
      [api.reducerPath]: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {
          refetchOnMountOrArgChange: false,
          refetchOnReconnect: false,
          refetchOnFocus: false,
          reducerPath: 'api',
          online: true,
          focused: true,
          middlewareRegistered: true,
          keepUnusedDataFor: 60,
          invalidationBehavior: 'delayed',
        },
      },
    };

    store = mockStore(selectedState);
    store.dispatch = jest.fn();

    renderWithProviders(<SearchResults results={mockResults} onItemClick={jest.fn()} />, { store });

    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(store.dispatch).toHaveBeenCalledWith(removeItem(mockResults[0].url));
  });
});