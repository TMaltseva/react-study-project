// @ts-ignore
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../src/components/Pagination';

describe('Pagination Component', () => {
  const onPageChange = jest.fn();

  it('should render the pagination component', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('should call onPageChange with the next page number when the next button is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('→'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with the previous page number when the previous button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('←'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('should disable the previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByText('←')).toBeDisabled();
  });

  it('should disable the next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByText('→')).toBeDisabled();
  });
});
