import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const createPost = createAsyncThunk(
  'post/createPost',
  async ({ form, navigate, toast }, { rejectWithValue }) => {
    try {
       console.log(form.get('imageCover')); //it has image
      const response = await api.createPost(form);
    //  console.log(response)
      toast.success('Post Added Successfully');
      navigate('/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async ({searchW, currentPage}, { rejectWithValue }) => {
    try { 
        const response = await api.getAllPosts(searchW,currentPage);
         console.log(response);
        return response.data;
     
    } catch (err) {
       console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPost = createAsyncThunk(
  'post/getPost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getPost(id);
      return response.data;
    } catch (err) {
      //console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  'post/getuserPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getUserPosts(userId);

      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deletePost(id);
      toast.success('Post deleted successfully!');
      return response.data;
    } catch (err) {
      // console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ id, form, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updatePost(id, form);
      toast.success('Post updated successfully!');
      navigate('/');
      return response.data;
    } catch (err) {
      // console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: {},
    posts: [],
    userPosts: [],
    currentPage: 1,
    numberOfPages: null,
    error: '',
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getAllPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
     // console.log(action.payload);
      state.posts = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.error)
      state.error = action.payload?.message;
    },
    [getPost.pending]: (state, action) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;

      state.post = action.payload.data;
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getUserPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.userPosts = action.payload;
    },
    [getUserPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userPosts = state.userPosts.filter((item) => item._id !== id);
        state.posts = state.posts.filter((item) => item._id !== id);
      }
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userPosts = state.userPosts.map((item) =>
          item._id === id ? action.payload : item
        );
        state.posts = state.posts.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = postSlice.actions;
export default postSlice.reducer;
