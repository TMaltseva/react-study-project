import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../src/components/ThemeProvider';
import ThemeToggleButton from '../src/components/ThemeToggleButton';

test('renders ThemeToggleButton', () => {
  const { getByText } = render(
    <ThemeProvider>
      <ThemeToggleButton />
    </ThemeProvider>
  );
  expect(getByText(/toggle theme/i)).toBeInTheDocument();
});