import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import videoSharedReducer from './videoSharedSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    videoShared: videoSharedReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
