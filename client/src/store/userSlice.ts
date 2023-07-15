import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

const URL = 'http://localhost:5000/api/users';

export const login = createAsyncThunk(
  'users/login',
  async ( data ) => {
    const res = await axios.post(`${URL}/login`, data)
    return res.data;
  }
);

export const register = createAsyncThunk(
  'users/register',
  async ( data ) => {
    const res = await axios.post(`${URL}/register`, data)
    return res.data;
  }
);

export interface UserState {
  isLoading: boolean;
  error: any;
  userInfo: userInfo | null;
  userVideoShared: object[];
}

export interface userInfo {
  _id: string;
  name: string;
  email: string;
  token: string;
}

const userInfoFromStorage: userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;

const inititalSate: UserState = {
  isLoading: false,
  error: null,
  userInfo: userInfoFromStorage,
  userVideoShared: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState: inititalSate,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
  }
});

export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
