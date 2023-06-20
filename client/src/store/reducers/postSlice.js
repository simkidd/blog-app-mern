import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import {
  createPostAPI,
  deletePostAPI,
  getAllPostsAPI,
  getPostAPI,
  updatePostAPI,
} from "../../services/postServices";

// Async thunk for creating a post
export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      
      const response = await createPostAPI(postData, token);
      toast.success("Post created successfully");
      return response;
    } catch (error) {
      toast.error("Failed to create post");
      return rejectWithValue(error);
    }
  }
);

// Async thunk for fetching all posts
export const fetchAllPostsAsync = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPostsAPI();
      return response;
    } catch (error) {
      toast.error("Failed to fetch posts");
      return rejectWithValue(error);
    }
  }
);

// Async thunk for fetching a single post
export const fetchPostAsync = createAsyncThunk(
  "posts/fetchPost",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await getPostAPI(slug);
      return response;
    } catch (error) {
      toast.error("Failed to fetch post");
      return rejectWithValue(error);
    }
  }
);

// Async thunk for updating a post
export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async (postData, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const response = await updatePostAPI(postData.slug, postData, token);
      toast.success("Post updated successfully");
      return response;
    } catch (error) {
      toast.error("Failed to update post");
      return rejectWithValue(error);
    }
  }
);

// Async thunk for deleting a post
export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async (slug, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const response = await deletePostAPI(slug, token);
      toast.success("Post deleted successfully");
      return response;
    } catch (error) {
      toast.error("Failed to delete post");
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllPostsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPostsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update the corresponding post in the state
        const index = state.posts.findIndex(
          (post) => post.slug === action.payload.slug
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(fetchPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update the corresponding post in the state
        const index = state.posts.findIndex(
          (post) => post.slug === action.payload.slug
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted post from the state
        state.posts = state.posts.filter(
          (post) => post.slug !== action.payload.slug
        );
      })
      .addCase(deletePostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const postReducer = postSlice.reducer;
export default postReducer;
