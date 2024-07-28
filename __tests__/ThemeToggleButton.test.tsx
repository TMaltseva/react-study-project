import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../src/components/ThemeProvider';
import ThemeToggleButton from '../src/components/ThemeToggleButton';
import '@testing-library/jest-dom';

test('renders ThemeToggleButton component', () => {
  render(
    <ThemeProvider>
      <ThemeToggleButton />
    </ThemeProvider>
  );

  const button = screen.getByText(/To dark theme/i);
  fireEvent.click(button);
  expect(button).toHaveTextContent(/To light theme/i);
});
