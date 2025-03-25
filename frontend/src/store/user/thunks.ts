import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { dropToken, saveToken } from '../../services/token';
import { UserAuth, UserData, UserRegister } from '../../types/user/user';
import { AppDispatch, State } from '../../types/state';

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.CheckAuth);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, UserAuth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.accessToken);
    return data;
  },
);

// export const logoutAction = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/logout',
//   async (_arg, { extra: api }) => {
//     await api.delete(APIRoute.Logout);
//     dropToken();
//   },
// );

export const registerAction = createAsyncThunk<UserData, /*UserRegister*/FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async (formData , { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Register, formData);
    return data;
  });
