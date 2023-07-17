import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RootState } from './store';
import { FormValues } from '../components/AddNewVideoForm';

const URL = 'http://localhost:5000/api/videos-shared';

export const fetchVideoShared = createAsyncThunk(
  'videoShared/getVideoShared',
  async ( ) => {
    const res = await axios.get(URL);
    return res.data as VideoShared[];
});

export const addVideoShared = createAsyncThunk< unknown, FormValues, { state: RootState}>(
  'videoShared/addVideoShared',
  async ( data: { title: string, description: string, url: string }, { getState } ) => {
    const { userInfo } = getState().user;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
    }
    const res = await axios.post(`${URL}/create`, data, config);
    return res.data as VideoShared;
});

export const deleteVideoShared = createAsyncThunk<string, string, { state: RootState}>(
  'videoShared/deleteVideoShared',
  
  async ( id, { getState } ) => {
    const userInfo = getState().user.userInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
    }

    const res: AxiosResponse<string, string> = await axios.delete(`${URL}/${id}`, config);
    return res.data ;
});

export interface VideoShared {
  _id: string;
  title: string;
  description: string;
  url: string;
  user: string;
  username: string;
}

export interface VideoSharedState {
  isLoading: boolean;
  error: unknown | null;
  videoShared: VideoShared[];
  newVideoShared: VideoShared | null;
}

const inititalSate: VideoSharedState = {
  isLoading: false,
  error: null,
  videoShared: [],
  newVideoShared: null,
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
        const newState: VideoSharedState = {
          ...state,
          isLoading: false,
          videoShared: action.payload,
          error: null,
        }
        console.log(newState);
        return newState;
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
        state.newVideoShared = action.payload;
        state.error = null;
      })
      .addCase(deleteVideoShared.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVideoShared.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteVideoShared.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
  }
});

export const videoSharedSelector = (state: RootState) => state.videoShared;
export default videoSharedSlice.reducer;
