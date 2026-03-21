import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import catalogUIReducer from '../features/catalogUI/catalogUISlice';
import pantryReducer from '../features/pantry/pantrySlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    catalogUI: catalogUIReducer,
    pantry: pantryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
