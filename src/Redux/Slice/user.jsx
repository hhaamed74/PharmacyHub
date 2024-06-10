import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../Routers/ProtectedRoute";

const URL = "https://e-pharmacy.runasp.net/api/account";

// Async thunk for user login
export const logIn = createAsyncThunk(
  "user/logIn",
  async (values, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      // Send POST request to login endpoint
      const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(values),
      });
      // Extract data from the response
      const data = await response.json();
      // Set cookies for token and user id
      document.cookie = `token=${data.token}`;
      document.cookie = `id=${data.id}`;
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Async thunk for user registration
export const register = createAsyncThunk(
  "user/register",
  async (values, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      // Send POST request to register endpoint
      const response = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(values),
      });
      // Extract data from the response
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Async thunk for updating user data
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (values, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const token = getCookie("token"); // Retrieve the token

    try {
      // Send PUT request to update user data
      const response = await fetch(`${URL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(values),
      });
      // Extract data from the response
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Async thunk for changing user password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (values, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const token = getCookie("token"); // Retrieve the token

    try {
      // Send POST request to change password endpoint
      const response = await fetch(`${URL}/ChangePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(values),
      });
      // Extract data from the response
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null, // Initialize user info to null
    loading: false, // Set loading to false initially
    error: null, // Set error to null initially
  },
  reducers: {}, // No reducers defined
  extraReducers: (builder) => {
    // Reducers for login, register, update user data, and change password async thunks
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
