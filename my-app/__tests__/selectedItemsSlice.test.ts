import selectedItemsReducer, { addItem, removeItem, clearItems } from '../src/services/selectedItemsSlice';

const initialState = {
  items: [],
};

test('should handle initial state', () => {
  expect(selectedItemsReducer(undefined, { type: 'unknown' })).toEqual({
    items: [],
  });
});

test('should handle addItem', () => {
  const actual = selectedItemsReducer(initialState, addItem({ name: 'Item 1', url: 'http://example.com/1' }));
  expect(actual.items.length).toEqual(1);
  expect(actual.items[0].name).toEqual('Item 1');
});

test('should handle removeItem', () => {
  const state = {
    items: [{ name: 'Item 1', url: 'http://example.com/1' }],
  };
  const actual = selectedItemsReducer(state, removeItem('http://example.com/1'));
  expect(actual.items.length).toEqual(0);
});

test('should handle clearItems', () => {
  const state = {
    items: [{ name: 'Item 1', url: 'http://example.com/1' }],
  };
  const actual = selectedItemsReducer(state, clearItems());
  expect(actual.items.length).toEqual(0);
});