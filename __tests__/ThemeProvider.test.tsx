import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../src/components/ThemeProvider';
import { ThemeContext } from '../src/services/themeContext';
import React, { useContext } from 'react';

const TestComponent: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return null;
  }

  return (
    <div>
      <span data-testid="theme">{context.theme}</span>
      <button onClick={context.toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('should provide the default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('should toggle the theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText('Toggle Theme');
    fireEvent.click(button);
    expect(screen.getByTestId('theme').textContent).toBe('dark');

    fireEvent.click(button);
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('should save the theme to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText('Toggle Theme');
    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});