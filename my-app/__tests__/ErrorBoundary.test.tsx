import { render, screen, fireEvent, act } from '@testing-library/react';
import ErrorBoundary from '../src/components/ErrorBoundary';
import ErrorButton from '../src/components/ErrorButton';
import '@testing-library/jest-dom';

describe('ErrorBoundary Component', () => {
  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('catches error and displays error message', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText('Throw Error');

    // Wrap the fireEvent call in act and try-catch
    act(() => {
      try {
        fireEvent.click(button);
      } catch (error) {
        // Error is expected, so we catch it to prevent it from failing the test
      }
    });

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('resets error state when "Go Search" button is clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText('Throw Error');

    // Wrap the fireEvent call in act and try-catch
    act(() => {
      try {
        fireEvent.click(button);
      } catch (error) {
      }
    });

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    const goSearchButton = screen.getByText('Go Search');
    fireEvent.click(goSearchButton);

    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
});