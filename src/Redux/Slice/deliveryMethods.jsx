import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../Routers/ProtectedRoute";

// Async thunk for fetching delivery methods
export const fetchDeliveryMethods = createAsyncThunk(
  "deliveryMethods/fetchDeliveryMethods",
  async () => {
    // Get token from cookie
    const token = await getCookie("token");
    // Send GET request to fetch delivery methods
    const response = await axios.get(
      "https://e-pharmacy.runasp.net/api/Orders/DeliveryMethods",
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Return data from the response
    return response.data;
  }
);

// Create delivery methods slice
const deliveryMethodsSlice = createSlice({
  name: "deliveryMethods",
  initialState: {
    deliveryMethods: [], // Initialize delivery methods array
    status: "idle", // Set initial status to idle
    error: null, // Set initial error to null
  },
  reducers: {}, // No reducers defined
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryMethods.pending, (state) => {
        // Set status to loading when fetch is pending
        state.status = "loading";
      })
      .addCase(fetchDeliveryMethods.fulfilled, (state, action) => {
        // Set status to succeeded and update delivery methods when fetch is successful
        state.status = "succeeded";
        state.deliveryMethods = action.payload;
      })
      .addCase(fetchDeliveryMethods.rejected, (state, action) => {
        // Set status to failed and update error message when fetch is rejected
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default deliveryMethodsSlice.reducer;
