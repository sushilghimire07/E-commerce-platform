import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productsList: [],
};

// Thunks
export const addNewProduct = createAsyncThunk('/products/addNewProduct', async (formData) => {
  const result = await axios.post("http://localhost:3000/api/admin/products/add", formData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return result?.data;
});

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async () => {
  const result = await axios.get("http://localhost:3000/api/admin/products/get");
  console.log(result)
  return result?.data;
});

export const editProduct = createAsyncThunk('/products/editProduct', async ({ id, formData }) => {
  const result = await axios.put(`http://localhost:3000/api/admin/products/edit/${id}`, formData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return result?.data;
});

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id) => {
  const result = await axios.delete(`http://localhost:3000/api/admin/products/delete/${id}`);
  return { id, ...result?.data };
});

// Slice
const AdminProductSlice = createSlice({
  name: 'adminProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload?.data;
        // console.log(action.payload?.data)
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productsList = [];
      })

      // Add Product
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.productsList.push(action.payload?.data);
      })

      // Edit Product
      .addCase(editProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload?.data;
        const index = state.productsList.findIndex(p => p._id === updatedProduct._id);
        if (index !== -1) {
          state.productsList[index] = updatedProduct;
        }
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productsList = state.productsList.filter(product => product._id !== action.payload.id);
      });
  }
});

export default AdminProductSlice.reducer;
 