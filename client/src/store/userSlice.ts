import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

const URL = 'http://localhost:5000/api/users';

function createAction(arg0: string) {
  
}

export const loginPending = createAction('users/login/pending');
export const loginRejected = createAction('users/login/rejected');
export const loginFulfilled = createAction('users/login/fulfilled');

export const login = createAsyncThunk(
  'users/login',
  async ( data: { email: string, password: string } ) => {
    const res = await axios.post(`${URL}/login`, data)
    return res.data as UserInfo;
  }
);

export const register = createAsyncThunk(
  'users/register',
  async ( data: { name: string, email: string, password: string} ) => {
    const res = await axios.post(`${URL}/register`, data)
    return res.data as UserInfo;
  }
);

export interface UserState {
  isLoading: boolean;
  error: unknown | null;
  userInfo: UserInfo | null;
  userVideoShared: object[];
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  token: string;
}

const userInfoFromStorage: UserInfo | null = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) as UserInfo : null;

const inititalSate: UserState = {
  isLoading: false,
  error: null,
  userInfo: userInfoFromStorage,
  userVideoShared: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState: inititalSate,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(register.fulfilled, (state, action: { payload: UserInfo }) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
        state.error = null;
      })
  }
});

export const { logout } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
