'use client';

import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';
import ThemeProvider from './components/ThemeProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
}
