import selectedItemsReducer, { addItem, removeItem, clearItems } from '../src/services/selectedItemsSlice';
import { SearchResult } from '../src/components/SearchResults';

describe('selectedItemsSlice', () => {
  const initialState = {
    items: [],
  };

  it('should handle initial state', () => {
    expect(selectedItemsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addItem', () => {
    const newItem: SearchResult = { name: 'Test Item', url: 'http://example.com' };
    const actual = selectedItemsReducer(initialState, addItem(newItem));
    expect(actual.items).toEqual([newItem]);
  });

  it('should handle removeItem', () => {
    const initialStateWithItem = {
      items: [{ name: 'Test Item', url: 'http://example.com' }],
    };
    const actual = selectedItemsReducer(initialStateWithItem, removeItem('http://example.com'));
    expect(actual.items).toEqual([]);
  });

  it('should handle clearItems', () => {
    const initialStateWithItems = {
      items: [
        { name: 'Test Item 1', url: 'http://example.com/1' },
        { name: 'Test Item 2', url: 'http://example.com/2' },
      ],
    };
    const actual = selectedItemsReducer(initialStateWithItems, clearItems());
    expect(actual.items).toEqual([]);
  });
});