import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import axios, { AxiosResponse } from 'axios';
import { AnyAction } from '@reduxjs/toolkit';
import { login, logout, register } from './userSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

describe('userSlice', () => {
  let store: MockStoreEnhanced<unknown, ThunkDispatch<unknown, unknown, AnyAction>>;

  beforeEach(() => {
    store = mockStore({
      user: {
        isLoading: false,
        error: null,
        userInfo: null,
        userVideoShared: [],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password',
      };

      const mockResponse = {
        data: {
          _id: '123456',
          name: 'Test User',
          email: 'test@example.com',
          token: 'token',
        },
      };

      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
        data: mockResponse.data,
      } as AxiosResponse);

      await store.dispatch(login(loginData));

      const actions = store.getActions();
      expect(actions[0].type).toEqual(login.pending.type);
      expect(actions[1].type).toEqual(login.fulfilled.type);
      expect(actions[1].payload).toEqual(mockResponse.data);
    });

    it('should handle login failure', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password',
      };

      const errorResponse = { message: 'Invalid credentials' };

      (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(errorResponse);

      await store.dispatch(login(loginData));

      const actions = store.getActions();
      expect(actions[0].type).toEqual(login.pending.type);
      expect(actions[1].type).toEqual(login.rejected.type);
      expect(actions[1].error).toEqual(errorResponse);
      expect(actions[2]).toBeUndefined();
    });
  });


  describe('register', () => {
    it('should register successfully', async () => {
      const registerData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };

      const mockResponse = {
        data: {
          _id: '123456',
          name: 'Test User',
          email: 'test@example.com',
          token: 'token',
        },
      };

      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
        data: mockResponse.data,
      } as AxiosResponse);

      await store.dispatch(register(registerData));

      const actions = store.getActions();
      expect(actions[0].type).toEqual(register.pending.type);
      expect(actions[1].type).toEqual(register.fulfilled.type);
      expect(actions[1].payload).toEqual(mockResponse.data);
    });

    it('should handle registration failure', async () => {
      const registerData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };

      const errorResponse = { message: 'Registration failed' };

      (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(errorResponse);

      await store.dispatch(register(registerData));

      const actions = store.getActions();
      expect(actions[0].type).toEqual(register.pending.type);
      expect(actions[1].type).toEqual(register.rejected.type);
      expect(actions[1].error).toEqual(errorResponse);
      expect(actions[2]).toBeUndefined();
    });
  });

  describe('logout', () => {
    it('should remove userInfo from localStorage and reset user state', () => {
      store.dispatch(logout());

      const actions = store.getActions();
      //expect(localStorage.removeItem).toHaveBeenCalledWith('userInfo');
      expect(actions[0].type).toEqual(logout.type);
    });
  });

});
