import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// Async Thunks
export const registerUser = createAsyncThunk('/auth/register',
  async (FormData) => {
    const response = await axios.post('http://localhost:3000/api/auth/register', FormData, {
      withCredentials: true
    });
    return response.data;
  }
);

export const loginUser = createAsyncThunk('/auth/login',
  async (FormData) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', FormData, {
      withCredentials: true
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success || null;
        state.isAuthenticated = action.payload.success || false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user: null;
        state.isAuthenticated = action.payload.success || false;
      }) 
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
