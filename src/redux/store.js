import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import PostReducer from './features/postsSlice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
