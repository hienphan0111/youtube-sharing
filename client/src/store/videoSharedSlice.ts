import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

const URL = 'http://localhost:5000/api/video-shared';

export const getVideoShared = createAsyncThunk(
  'videoShared/getVideoShared',
  async ( ) => {
    const res = await axios.get(URL);
    return res.data;
});

export const addVideoShared = createAsyncThunk<any, any, { state: RootState}>(
  'videoShared/addVideoShared',
  async ( data: { title: string, description: string, url: string }, { getState } ) => {
    const userInfo = getState().user.userInfo;

    const res = await axios.post(`${URL}/create`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      }
    },
    data);
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

export interface VideoSharedState {
  isLoading: boolean;
  error: any;
  videoShared: object[];
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
      .addCase(getVideoShared.pending, (state: VideoSharedState, action: PayloadAction) => {
        state.isLoading = true;
      })
      .addCase(getVideoShared.rejected, (state: VideoSharedState, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getVideoShared.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videoShared = action.payload;
        state.error = null;
      })
      .addCase(addVideoShared.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addVideoShared.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addVideoShared.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videoShared = action.payload;
        state.error = null;
      })
      .addCase(deleteVideoShared.pending, (state, action) => {
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

export default videoSharedSlice.reducer;
