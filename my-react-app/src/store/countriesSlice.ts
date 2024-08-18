import { createSlice } from '@reduxjs/toolkit';
import { validCountries } from '../data/countries';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: validCountries,
  reducers: {},
});

export default countriesSlice.reducer;
