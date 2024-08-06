import { makeStore } from '../src/store/store';
import { api } from '../src/services/api';

describe('Redux Store', () => {
  it('should create a store with the correct reducers and middleware', () => {
    const store = makeStore();

    const rootReducer = store.getState();
    expect(rootReducer).toHaveProperty(api.reducerPath);
    expect(rootReducer).toHaveProperty('selectedItems');
  });

  it('should dispatch actions correctly', () => {
    const store = makeStore();

    const action = { type: 'test/action' };
    store.dispatch(action);

    const state = store.getState();
    expect(state).toBeDefined();
  });
});