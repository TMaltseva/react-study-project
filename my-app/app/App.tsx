'use client';

import React from 'react';
import { wrapper } from '../store/store';
import { Provider } from 'react-redux';
import Home from './Home';

const App: React.FC = () => {
  const { store } = wrapper.useWrappedStore({});
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
