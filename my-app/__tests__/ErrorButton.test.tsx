import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from '../src/components/ErrorButton';
import '@testing-library/jest-dom';

describe('ErrorButton Component', () => {
  it('renders the button', () => {
    render(<ErrorButton />);
    expect(screen.getByText('Throw Error')).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<ErrorButton />);
      fireEvent.click(screen.getByText('Throw Error'));
    }).toThrow('Test error from ThrowErrorButton');

    consoleError.mockRestore();
  });
});