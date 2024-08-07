import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('renders SearchBar and handles search', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);
  
    const input = screen.getByLabelText('Search input');
    const button = screen.getByText('Search');
  
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);
  
    expect(onSearchMock).toHaveBeenCalledWith('test', 1);
  });