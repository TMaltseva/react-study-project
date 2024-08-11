import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../app/components/ThemeProvider';
import { useTheme } from '../app/services/themeContext';
import '@testing-library/jest-dom';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span>Current theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

test('toggles theme', () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );

  expect(screen.getByText('Current theme: light')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Toggle Theme'));
  expect(screen.getByText('Current theme: dark')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Toggle Theme'));
  expect(screen.getByText('Current theme: light')).toBeInTheDocument();
});