import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "../../services/userServices";

// Async Thunks
// Fetch all users (admin)
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth; // Assuming you have an auth slice

      const users = await userService.getAllUsersAPI(token);
      return users;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Fetch a user (admin)
export const fetchUser = createAsyncThunk(
  "users/fetch",
  async (id, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth; // Assuming you have an auth slice

      const user = await userService.getUserAPI(id, token);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update a user (admin)
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, userData }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth; // Assuming you have an auth slice

      const updatedUser = await userService.updateUserAPI(id, userData, token);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete a user (admin)
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth; // Assuming you have an auth slice

      await userService.deleteUserAPI(id, token);
      return id; // Return the deleted user ID if successful
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all users
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch a user
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update a user
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      // Update the user in the users array if applicable
      if (state.user && state.user._id === action.payload._id) {
        state.user = action.payload;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete a user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      // Remove the deleted user from the users array if applicable
      state.users = state.users.filter((user) => user._id !== action.payload);
      // Reset the user state if the deleted user is the current user
      if (state.user && state.user._id === action.payload) {
        state.user = null;
      }
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
