import { createSlice } from '@reduxjs/toolkit';

export interface CatalogUIState {
  query: string;
  filters: Record<string, string[]>;
  sort: string;
  currentPage: number;
}

const initialState: CatalogUIState = {
  query: '',
  filters: {},
  sort: 'relevance',
  currentPage: 1,
};

const catalogUISlice = createSlice({
  name: 'catalogUI',
  initialState,
  reducers: {},
});

export default catalogUISlice.reducer;
