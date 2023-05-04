import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../api';

export const login = createAsyncThunk(
  'auth/login',
  async ({ inputValues, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.logIn(inputValues);
      toast.success('Login Successfully', {
        position: 'top-center',
      });
      navigate('/');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const singUp = createAsyncThunk(
  'auth/signup',
  async ({ inputValues, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.singUp(inputValues);
      toast.success('Account created successfully.');
      navigate('/');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/updateUser',
  async ({ formDatas, toast, navigate}, { rejectWithValue }) => {
    try {
     
      const response = await api.updateUserData(formDatas);
      toast.success('Profile updated successfully!');
      navigate('/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'auth/updateUserPassword',
  async ({ newPassword, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updatePassword(newPassword);
      toast.success('Profile updated successfully!');
      //console.log(response.data);
      navigate('/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteMe = createAsyncThunk(
  'auth/deleteMe',
  async ({ navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteMyProfile();
      toast.success('We hope to see you back soon!');
      navigate('/');
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const emailForgotPassword = createAsyncThunk(
  'auth/emailForgotPassword',
  async ({ inputValues, toast }, { rejectWithValue }) => {
    try {
      const response = await api.eforgotPassword(inputValues);
      toast.success(
        'A link to reset password has been sent into your email. Please, check it!',
        {
          position: 'top-center',
        }
      );

      return response.data;
    } catch (err) {
      //console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetForgotPassword = createAsyncThunk(
  'auth/resetForgottenPassword',
  async ({ inputValues, token, toast }, { rejectWithValue }) => {
    try {
      const response = await api.resetPassword(inputValues, token);
      toast.success('Password has been reset, please go at login page!', {
        position: 'top-center',
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
      console.log(state.user);
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
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

      state.error = action.payload?.message;
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
      state.error = action.payload?.message;
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
      state.error = action.payload?.message;
    },
    [deleteMe.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteMe.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.clear();
      state.user = null;
    },
    [deleteMe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [emailForgotPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [emailForgotPassword.fulfilled]: (state, action) => {
      state.loading = false;

      state.user = action.payload;
    },
    [emailForgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [resetForgotPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [resetForgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [resetForgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
