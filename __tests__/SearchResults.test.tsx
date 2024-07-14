import { render, screen, fireEvent } from '@testing-library/react';
import SearchResults, { SearchResult } from '../src/components/SearchResults';
import '@testing-library/jest-dom';

describe('SearchResults Component', () => {
  const mockResults: SearchResult[] = [
    { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
    { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
  ];

  const onItemClick = jest.fn();

  it('should render the specified number of cards', () => {
    render(<SearchResults results={mockResults} onItemClick={onItemClick} />);
    expect(screen.getAllByRole('heading')).toHaveLength(mockResults.length);
  });

  it('should display an appropriate message if no cards are present', () => {
    render(<SearchResults results={[]} onItemClick={onItemClick} />);
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('should call onItemClick with the correct id when a card is clicked', () => {
    render(<SearchResults results={mockResults} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(onItemClick).toHaveBeenCalledWith('1');
  });
});