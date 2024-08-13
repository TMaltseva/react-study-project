import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store/store';
import SearchResults from '../app/components/SearchResults';

const mockResults = [
  { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
  { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
];

test('renders SearchResults and handles item click', () => {
  const handleItemClick = jest.fn();
  const { getByText } = render(
    <Provider store={store}>
      <SearchResults results={mockResults} onItemClick={handleItemClick} />
    </Provider>
  );

  const item = getByText('Luke Skywalker');
  fireEvent.click(item);

  expect(handleItemClick).toHaveBeenCalledWith('1');
});