import { render, screen } from '@testing-library/react';
import NotFound from '../src/pages/404';
import '@testing-library/jest-dom';

describe('NotFound Component', () => {
  it('renders the 404 message', () => {
    render(<NotFound />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Sorry, the page you are looking for does not exist')).toBeInTheDocument();
  });

  it('renders the "Go Search" link', () => {
    render(<NotFound />);
    const linkElement = screen.getByText('Go Search');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/');
  });
});