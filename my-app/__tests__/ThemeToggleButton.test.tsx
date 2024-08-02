import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../src/components/ThemeProvider';
import ThemeToggleButton from '../src/components/ThemeToggleButton';
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