import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../src/store';
import SearchResults from '../src/components/SearchResults';
import '@testing-library/jest-dom';

const mockResults = [
  { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
  { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
];

test('renders SearchResults component', () => {
  const handleItemClick = jest.fn();
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SearchResults results={mockResults} onItemClick={handleItemClick} />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Luke Skywalker/i));
  expect(handleItemClick).toHaveBeenCalledWith('1');
});