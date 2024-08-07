import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useFetchDetailsQuery } from '../src/services/api';
import DetailsWrapper from '../src/components/DetailsWrapper';

jest.mock('../src/services/api');

test('renders loading state', () => {
  (useFetchDetailsQuery as jest.Mock).mockReturnValue({ isLoading: true });

  render(<DetailsWrapper id="1" onClose={() => {}} />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders error state', () => {
  (useFetchDetailsQuery as jest.Mock).mockReturnValue({ error: true });

  render(<DetailsWrapper id="1" onClose={() => {}} />);

  expect(screen.getByText('Error loading details')).toBeInTheDocument();
});

test('renders details and handles close', () => {
  const details = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
  };

  (useFetchDetailsQuery as jest.Mock).mockReturnValue({ data: details });

  const onClose = jest.fn();
  render(<DetailsWrapper id="1" onClose={onClose} />);

  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Close'));
  expect(onClose).toHaveBeenCalled();
});