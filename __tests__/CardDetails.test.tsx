import { render, screen, waitFor } from '@testing-library/react';
import CardDetails from '../src/components/CardDetails';
import { fetchDetails } from '../src/services/fetchDetails';
import '@testing-library/jest-dom';

jest.mock('../src/services/fetchDetails');

const mockDetails = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
};

describe('CardDetails Component', () => {
  it('should display a loading indicator while fetching data', () => {
    (fetchDetails as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<CardDetails id="1" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display the detailed card data', async () => {
    (fetchDetails as jest.Mock).mockResolvedValue(mockDetails);
    render(<CardDetails id="1" />);
    await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
  });

  it('should display a message if no details are available', async () => {
    (fetchDetails as jest.Mock).mockResolvedValue(null);
    render(<CardDetails id="1" />);
    await waitFor(() => expect(screen.getByText('No details available')).toBeInTheDocument());
  });
});