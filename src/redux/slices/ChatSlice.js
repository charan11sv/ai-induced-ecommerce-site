// src/redux/slices/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const submitQuery = createAsyncThunk('chat/submitQuery', async (queryData) => {
  const response = await api.post('/chats/query/', queryData);
  return response.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: { messages: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitQuery.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.status = 'succeeded';
      });
  },
});

export default chatSlice.reducer;
