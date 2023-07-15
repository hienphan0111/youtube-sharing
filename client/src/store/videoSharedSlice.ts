import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import io from 'socket.io-client';

//const socket = io.connect('http://localhost:5000');

const URL = 'http://localhost:5000/api/videos-shared';

export const fetchVideoShared = createAsyncThunk(
  'videoShared/getVideoShared',
  async ( ) => {
    const res = await axios.get(URL);
    return res.data;
});

export const addVideoShared = createAsyncThunk<any, any, { state: RootState}>(
  'videoShared/addVideoShared',
  async ( data: { title: string, description: string, url: string }, { getState } ) => {
    const { userInfo } = getState().user;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
        'Content-Type': 'application/json'
      },
    }
    const res = await axios.post(`${URL}/create`, data, config);
    //socket.emit('new-video-shared', res.data);
    return res.data;
});

export const deleteVideoShared = createAsyncThunk<any, any, { state: RootState}>(
  'videoShared/deleteVideoShared',
  
  async ( id, { getState } ) => {
    const userInfo = getState().user.userInfo;
    const res = await axios.delete(`${URL}/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      }
    }
    );
    return res.data;
});

export interface VideoShared {
  _id: string;
  title: string;
  description: string;
  url: string;
  user: string;
}

export interface VideoSharedState {
  isLoading: boolean;
  error: any;
  videoShared: VideoShared[];
}

const inititalSate: VideoSharedState = {
  isLoading: false,
  error: null,
  videoShared: [],
}

const videoSharedSlice = createSlice({
  name: 'videoShared',
  initialState: inititalSate,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchVideoShared.pending, (state: VideoSharedState) => {
        state.isLoading = true;
      })
      .addCase(fetchVideoShared.rejected, (state: VideoSharedState, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchVideoShared.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videoShared = action.payload;
        state.error = null;
      })
      .addCase(addVideoShared.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addVideoShared.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addVideoShared.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videoShared.push(action.payload);
        state.error = null;
      })
      .addCase(deleteVideoShared.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVideoShared.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteVideoShared.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videoShared = action.payload;
        state.error = null;
      })
  }
});

export const videoSharedSelector = (state: RootState) => state.videoShared;
export default videoSharedSlice.reducer;
