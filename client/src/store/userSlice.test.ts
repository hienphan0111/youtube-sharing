import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, register } from './userSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
const mockStore = configureStore([thunk]);

// Mock the login.pending, login.rejected, and login.fulfilled actions
const { login: { pending: loginPending, rejected: loginRejected, fulfilled: loginFulfilled } } = require('./userSlice.ts');

const { register: { pending: registerPending, rejected: registerRejected, fulfilled: registerFulfilled } } = require('./userSlice');

describe('yourSlice', () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mock.reset();
  });

  it('should handle login successfully', async () => {
    const userInfo = { _id: '123', name: 'John Doe', email: 'john@example.com', token: 'token' };
    const loginData: {
      email: string;
      password: string;
  } = { email: 'john@example.com', password: 'password' };

    mock.onPost('http://localhost:5000/api/users/login').reply(200, userInfo);

    void store.dispatch(login(loginData));

    const actions = store.getActions();
    expect(actions[0]).toEqual(loginPending());
    expect(actions[1]).toEqual(loginFulfilled(userInfo));
    expect(localStorage.getItem('userInfo')).toEqual(JSON.stringify(userInfo));
  });

  it('should handle login failure', async () => {
    const errorResponse = { message: 'Login failed' };
    const loginData = { email: 'john@example.com', password: 'password' };

    mock.onPost('http://localhost:5000/api/users/login').reply(400, errorResponse);

    store.dispatch(login(loginData));

    const actions = store.getActions();
    expect(actions[0]).toEqual(loginRejected());
    expect(localStorage.getItem('userInfo')).toBeNull();
  });

  it('should handle register successfully', async () => {
    const userInfo = { _id: '123', name: 'John Doe', email: 'john@example.com', token: 'token' };
    const registerData = { name: 'John Doe', email: 'john@example.com', password: 'password' };

    mock.onPost('http://localhost:5000/api/users/register').reply(200, userInfo);

    store.dispatch(register(registerData));

    const actions = store.getActions();
    expect(actions[0].type).toEqual('users/register/pending');
    expect(actions[1].type).toEqual('users/register/fulfilled');
    expect(actions[1].payload).toEqual(userInfo);
    expect(actions[1].meta.arg).toEqual(registerData);
    expect(localStorage.getItem('userInfo')).toEqual(JSON.stringify(userInfo));
  });

  it('should handle register failure', async () => {
    const errorResponse = { message: 'Registration failed' };
    const registerData = { name: 'John Doe', email: 'john@example.com', password: 'password' };

    mock.onPost('http://localhost:5000/api/users/register').reply(400, errorResponse);

    store.dispatch(register(registerData));

    const actions = store.getActions();
    expect(actions[0].type).toEqual('users/register/pending');
    expect(actions[1].type).toEqual('users/register/rejected');
    expect(actions[1].error.message).toEqual('Request failed with status code 400');
    expect(localStorage.getItem('userInfo')).toBeNull();
  });
});
