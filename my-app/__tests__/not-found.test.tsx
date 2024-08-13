import { render, screen } from '@testing-library/react';
import NotFound from '../app/not-found/page';
import '@testing-library/jest-dom';

describe('NotFound Component', () => {
  it('renders the 404 message and link', () => {
    render(<NotFound />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();

    expect(screen.getByText('Sorry, the page you are looking for does not exist')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /go search/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});