import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../app/components/Pagination';

describe('Pagination Component', () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  test('renders correctly with given props', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '←' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '→' })).toBeEnabled();
  });

  test('calls onPageChange with the correct page number when next button is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: '→' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange with the correct page number when previous button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: '←' }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test('disables next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);

    expect(screen.getByRole('button', { name: '→' })).toBeDisabled();
  });

  test('disables previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    expect(screen.getByRole('button', { name: '←' })).toBeDisabled();
  });
});