import React from 'react';
import './styles/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/app/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
