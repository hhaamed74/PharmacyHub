import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from '../../Routers/ProtectedRoute';

// Async thunk for fetching delivery methods
export const fetchDeliveryMethods = createAsyncThunk(
  'deliveryMethods/fetchDeliveryMethods',
  async () => {
    const token = await getCookie('token');
    const response = await axios.get(
      'https://e-pharmacy.runasp.net/api/Orders/DeliveryMethods',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },
);

const deliveryMethodsSlice = createSlice({
  name: 'deliveryMethods',
  initialState: {
    deliveryMethods: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryMethods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeliveryMethods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliveryMethods = action.payload;
      })
      .addCase(fetchDeliveryMethods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default deliveryMethodsSlice.reducer;
