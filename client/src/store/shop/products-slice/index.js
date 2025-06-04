import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products
export const fetchAllFilteredProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const result = await axios.get("http://localhost:3000/api/shop/products/get");
    // console.log(result);
    return result?.data;
  }
);

// Initial state
const initialState = {
  isLoading: false,
  productList: [],
};

// Create slice
const shoppingProductSlice = createSlice({
  name: 'shoppingProducts',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default shoppingProductSlice.reducer;
