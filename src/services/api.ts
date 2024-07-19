import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface PeopleResponse {
  results: Person[];
  count: number;
}

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchPeople: builder.query<{ results: Person[]; totalPages: number }, { searchTerm: string; page: number }>({
      query: ({ searchTerm, page }) => `people/?search=${searchTerm}&page=${page}`,
      transformResponse: (response: PeopleResponse) => ({
        results: response.results,
        totalPages: Math.ceil(response.count / 10),
      }),
    }),
    fetchDetails: builder.query<Person, string>({
      query: (id: string) => `people/${id}/`,
    }),
  }),
});

export const { useFetchPeopleQuery, useFetchDetailsQuery } = api;
