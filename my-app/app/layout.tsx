'use client';

import React from 'react';
import ProviderWrapper from './ProviderWrapper';
import ThemeProvider from '../components/ThemeProvider';
import ErrorBoundary from '../components/ErrorBoundary';
import '../styles/globals.css';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/app/favicon.ico" />
      </head>
      <body>
        <ErrorBoundary>
          <ProviderWrapper>
            <ThemeProvider>{children}</ThemeProvider>
          </ProviderWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
