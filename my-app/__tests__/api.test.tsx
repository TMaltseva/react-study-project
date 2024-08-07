import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { api, useFetchPeopleQuery, useFetchDetailsQuery } from '../src/services/api';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const createTestStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

interface TestComponentProps {
  hook: () => any;
}

const TestComponent: React.FC<TestComponentProps> = ({ hook }) => {
  const hookResult = hook();
  return <div>{JSON.stringify(hookResult)}</div>;
};

describe('API tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches people successfully', async () => {
    const mockResponse = {
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
      count: 1,
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const store = createTestStore();

    const { getByText } = render(
      <Provider store={store}>
        <TestComponent hook={() => useFetchPeopleQuery({ searchTerm: 'Luke', page: 1 })} />
      </Provider>
    );

    await waitFor(() => {
      const result = JSON.parse(getByText(/isLoading/i).textContent || '{}');
      expect(result.isLoading).toBe(false);
      expect(result.data).toEqual({
        results: mockResponse.results,
        totalPages: 1,
      });
    });
  });

  it('fetches person details successfully', async () => {
    const mockPerson = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockPerson));

    const store = createTestStore();

    const { getByText } = render(
      <Provider store={store}>
        <TestComponent hook={() => useFetchDetailsQuery('1')} />
      </Provider>
    );

    await waitFor(() => {
      const result = JSON.parse(getByText(/isLoading/i).textContent || '{}');
      expect(result.isLoading).toBe(false);
      expect(result.data).toEqual(mockPerson);
    });
  });
});