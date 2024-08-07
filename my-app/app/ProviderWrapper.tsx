'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';

const ProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { store } = wrapper.useWrappedStore({});
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
