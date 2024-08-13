import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../app/services/api';
import selectedItemsReducer from '../app/services/selectedItemsSlice';
import ClientApp from '../app/components/ClientApp';
import { ThemeProvider } from '../app/components/ThemeProvider';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
(useSearchParams as jest.Mock).mockReturnValue({
  get: jest.fn((key: string) => {
    if (key === 'search') return 'Luke';
    if (key === 'page') return '1';
    return null;
  }),
});

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

describe('ClientApp', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ThemeProvider>
          <ClientApp />
        </ThemeProvider>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});