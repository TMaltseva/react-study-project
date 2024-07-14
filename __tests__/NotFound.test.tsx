import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../src/components/NotFound';
import '@testing-library/jest-dom';

describe('NotFound component', () => {
  it('should render the NotFound component correctly', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const heading = screen.getByText('404 - Page Not Found');
    const paragraph = screen.getByText('Sorry, the page you are looking for does not exist');
    const link = screen.getByText('Go Search');

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});