import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCommentAPI,
  updateCommentAPI,
  deleteCommentAPI,
} from "../../services/commentService";

export const createCommentAsync = createAsyncThunk(
  "comments/createComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await createCommentAPI(commentData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCommentAsync = createAsyncThunk(
  "comments/updateComment",
  async ({ commentId, commentData }, { rejectWithValue }) => {
    try {
      const response = await updateCommentAPI(commentId, commentData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCommentAsync = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await deleteCommentAPI(commentId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createCommentAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = "Comment created successfully";
      })
      .addCase(createCommentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCommentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateCommentAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = "Comment updated successfully";
      })
      .addCase(updateCommentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCommentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteCommentAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = "Comment deleted successfully";
      })
      .addCase(deleteCommentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const commentReducer = commentSlice.reducer;
export default commentReducer;
