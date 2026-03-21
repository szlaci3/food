import { createSlice } from '@reduxjs/toolkit';

export interface PantryItem {
  productId: string;
  quantity: number;
}

export interface PantryState {
  items: Record<string, PantryItem>;
}

const initialState: PantryState = {
  items: {},
};

const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  reducers: {},
});

export default pantrySlice.reducer;
