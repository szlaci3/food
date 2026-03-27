import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  origin?: string;
  brands?: string;
}

export interface ProductsState {
  entities: Record<string, Product>;
  results: string[];
  loading: boolean;
  error: string | null;
}

export interface FetchProductsArgs {
  query: string;
  filters: Record<string, string[]>;
  sort: string;
  currentPage: number;
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (args: FetchProductsArgs) => {
    const params = new URLSearchParams();
    params.append('fields', '_id,id,product_name,product_name_en,origins,origin,brands');
    
    if (args.query) {
      params.append('search_terms', args.query);
    }
    
    if (args.filters.category && args.filters.category.length > 0) {
      params.append('categories_tags', args.filters.category.join(','));
    }
    
    if (args.sort) {
      params.append('sort_by', args.sort);
    }
    
    if (args.currentPage) {
      params.append('page', args.currentPage.toString());
    }
    
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/search?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    return data.products.map((p: any) => ({
      id: p._id || p.id,
      name: p.product_name || p.product_name_en || 'Unknown Product',
      origin: p.origin || p.origins || '',
      brands: p.brands || ''
    })) as Product[];
  }
);

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
  extraReducers: (builder) => {
    builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.results = action.payload.map((p) => p.id);
            const newEntities: Record<string, Product> = {};
            action.payload.forEach((p) => {
                newEntities[p.id] = p;
            });
            state.entities = newEntities;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching products';
        });
  },
});

export default productsSlice.reducer;
