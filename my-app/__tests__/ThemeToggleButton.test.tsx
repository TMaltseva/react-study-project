import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggleButton from '../app/components/ThemeToggleButton';
import { useTheme } from '../app/services/themeContext';
import '@testing-library/jest-dom';

jest.mock('../app/services/themeContext', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggleButton', () => {
  const mockToggleTheme = jest.fn();
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with light theme', () => {
    render(<ThemeToggleButton />);
    expect(screen.getByText('Switch to dark')).toBeInTheDocument();
  });

  it('renders correctly with dark theme', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });
    render(<ThemeToggleButton />);
    expect(screen.getByText('Switch to light')).toBeInTheDocument();
  });

  it('calls toggleTheme on button click', () => {
    render(<ThemeToggleButton />);
    const button = screen.getByText('Switch to dark');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});