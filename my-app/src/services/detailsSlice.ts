import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from './api';

interface DetailsState {
  item: Person | null;
}

const initialState: DetailsState = {
  item: null,
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetailsItem: (state, action: PayloadAction<Person>) => {
      state.item = action.payload;
    },
    clearDetailsItem: (state) => {
      state.item = null;
    },
  },
});

export const { setDetailsItem, clearDetailsItem } = detailsSlice.actions;
export default detailsSlice.reducer;
