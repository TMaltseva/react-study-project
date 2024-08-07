import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardDetails from '../components/CardDetails';

test('renders CardDetails with correct details', () => {
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

  const { getByText } = render(<CardDetails details={details} />);

  expect(getByText('Luke Skywalker')).toBeInTheDocument();
  expect(getByText('Height: 172')).toBeInTheDocument();
  expect(getByText('Mass: 77')).toBeInTheDocument();
  expect(getByText('Hair Color: blond')).toBeInTheDocument();
  expect(getByText('Skin Color: fair')).toBeInTheDocument();
  expect(getByText('Eye Color: blue')).toBeInTheDocument();
  expect(getByText('Birth Year: 19BBY')).toBeInTheDocument();
  expect(getByText('Gender: male')).toBeInTheDocument();
});