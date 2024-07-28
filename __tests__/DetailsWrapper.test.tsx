import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import DetailsWrapper from '../src/components/DetailsWrapper';

test('DetailsWrapper matches snapshot', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<DetailsWrapper />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});