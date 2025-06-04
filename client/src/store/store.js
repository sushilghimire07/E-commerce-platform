import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import AdminProductSlice from './admin/products-slice';
import shopProductsSlice from './shop/products-slice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    AdminProducts: AdminProductSlice,
    shopProducts:shopProductsSlice
    
  },
});

export default store;
