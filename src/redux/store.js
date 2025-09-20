// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import productReducer from './slices/ProductSlice';
import chatReducer from './slices/ChatSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    chat: chatReducer,
  },
});

export default store;
