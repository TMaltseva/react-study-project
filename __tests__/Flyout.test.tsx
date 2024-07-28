import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/store';
import Flyout from '../src/components/Flyout';
import { addItem } from '../src/services/selectedItemsSlice';
import '@testing-library/jest-dom';

test('renders Flyout component', () => {
  render(
    <Provider store={store}>
      <Flyout />
    </Provider>
  );

  expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();

  act(() => {
    store.dispatch(addItem({ name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' }));
  });

  expect(screen.getByText(/1 items selected/i)).toBeInTheDocument();
  expect(screen.getByText(/Unselect all/i)).toBeInTheDocument();
  expect(screen.getByText(/Download/i)).toBeInTheDocument();
});