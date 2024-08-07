import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Flyout from '../src/components/Flyout';

const mockStore = configureStore([]);

test('renders Flyout with selected items', () => {
  const store = mockStore({
    selectedItems: {
      items: [{ name: 'Item 1', url: 'http://example.com/1' }],
    },
  });

  render(
    <Provider store={store}>
      <Flyout />
    </Provider>
  );

  expect(screen.getByText('1 items selected')).toBeInTheDocument();
  expect(screen.getByText('Unselect all')).toBeInTheDocument();
  expect(screen.getByText('Download')).toBeInTheDocument();
});

test('handles unselect all', () => {
  const store = mockStore({
    selectedItems: {
      items: [{ name: 'Item 1', url: 'http://example.com/1' }],
    },
  });

  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <Flyout />
    </Provider>
  );

  fireEvent.click(screen.getByText('Unselect all'));
  expect(store.dispatch).toHaveBeenCalledWith({ type: 'selectedItems/clearItems' });
});