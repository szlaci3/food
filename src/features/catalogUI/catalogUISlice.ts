import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setFilters(state, action: PayloadAction<Record<string, string[]>>) {
      state.filters = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setQuery, setFilters, setSort, setPage } = catalogUISlice.actions;
export default catalogUISlice.reducer;
