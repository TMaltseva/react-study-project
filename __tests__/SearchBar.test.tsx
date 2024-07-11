// @ts-ignore
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../src/components/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  test('renders SearchBar component', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByLabelText('Search:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('saves the entered value to local storage on search button click', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByLabelText('Search:');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem('searchTerm')).toBe('test search');
    expect(mockOnSearch).toHaveBeenCalledWith('test search', 1);
  });

  test('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'stored search');
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByLabelText('Search:');

    expect(input).toHaveValue('stored search');
  });

  test('triggers search on Enter key press', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByLabelText('Search:');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(localStorage.getItem('searchTerm')).toBe('test search');
    expect(mockOnSearch).toHaveBeenCalledWith('test search', 1);
  });
});