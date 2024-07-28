import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import store from '../src/store';
import DetailsWrapper from '../src/components/DetailsWrapper';

const server = setupServer(
  rest.get('https://swapi.dev/api/people/:id/', (req, res, ctx) => {
    return res(
      ctx.json({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders DetailsWrapper component', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailsWrapper />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });
});