import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
}

export interface ProductsState {
  entities: Record<string, Product>;
  results: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  entities: {},
  results: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
