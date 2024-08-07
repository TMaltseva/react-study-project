import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../components/SearchResults';

interface SelectedItemsState {
  items: SearchResult[];
}

const initialState: SelectedItemsState = {
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('selectedItems') || '[]') : [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<SearchResult>) => {
      state.items.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedItems', JSON.stringify(state.items));
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.url !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedItems', JSON.stringify(state.items));
      }
    },
    clearItems: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedItems', JSON.stringify(state.items));
      }
    },
  },
});

export const { addItem, removeItem, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
