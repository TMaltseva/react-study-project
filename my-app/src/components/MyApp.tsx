import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import store from '@/store/store';
import ThemeProvider from '../components/ThemeProvider';
import ErrorBoundary from '../components/ErrorBoundary';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default MyApp;
