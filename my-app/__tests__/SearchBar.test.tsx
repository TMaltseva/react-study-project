import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../app/components/SearchBar';
import '@testing-library/jest-dom';

test('renders SearchBar and handles search', () => {
  const handleSearch = jest.fn();
  const { getByLabelText, getByText } = render(<SearchBar onSearch={handleSearch} />);

  const input = getByLabelText('Search:');
  fireEvent.change(input, { target: { value: 'test' } });

  const button = getByText('Search');
  fireEvent.click(button);

  expect(handleSearch).toHaveBeenCalledWith('test', 1);
});