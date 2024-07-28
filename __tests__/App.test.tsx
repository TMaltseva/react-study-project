import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import { ThemeProvider } from '../src/components/ThemeProvider';
import App from '../src/App';

test('renders App component correctly', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});