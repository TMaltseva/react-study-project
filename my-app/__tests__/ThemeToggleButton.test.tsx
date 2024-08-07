import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../components/ThemeProvider';
import ThemeToggleButton from '../components/ThemeToggleButton';
import '@testing-library/jest-dom';

describe('ThemeToggleButton', () => {
  it('toggles theme between light and dark', () => {
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Switch to dark');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Switch to light');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Switch to dark');
  });
});