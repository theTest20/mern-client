import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../api';

export const login = createAsyncThunk(
  'auth/login',
  async ({ inputValues, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.logIn(inputValues);
      toast.success('Login Successfully');
      navigate('/');
      return res.data;
    } catch (err) {
      if (!err.res) {
        let error = (err.message =
          'Unable to log in due to incorrect inputs or account is not verified!');
        return rejectWithValue(error);
      }
    }
  }
);

export const singUp = createAsyncThunk(
  'auth/signup',
  async ({ inputValues, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.singUp(inputValues);
      toast.success(
        'Register successfully. A link for account verification was sent into your email, please check it, in order to continue!'
      );
      navigate('/');
      return res.data;
    } catch (err) {
      // if (!err.res) {
      //   //console.log(err.request.response);
      //   //return rejectWithValue(err.request.response);
      //   let error = (err.message = 'User already exist!');
      // }
      return rejectWithValue(err);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/updateUser',
  async ({ newDatas, toast, navigate }, { rejectWithValue }) => {
    //console.log(newDatas);
    try {
      const response = await api.updateUserData(newDatas);
      toast.success('Profile updated successfully!');
      //console.log(response.data);
      navigate('/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'auth/updateUserPassword',
  async ({ newPassword, toast, navigate }, { rejectWithValue }) => {
    console.log(newPassword);
    try {
      const response = await api.updatePassword(newPassword);
      toast.success('Profile updated successfully!');
      //console.log(response.data);
      navigate('/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: '',
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem(
        'userProfile',
        JSON.stringify({ ...action.payload })
      );
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [singUp.pending]: (state, action) => {
      state.loading = true;
    },
    [singUp.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem(
        'userProfile',
        JSON.stringify({ ...action.payload })
      );
      state.user = action.payload;
    },
    [singUp.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = action.payload;
    },
    [updateUserInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [updateUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUserPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUserPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [updateUserPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
