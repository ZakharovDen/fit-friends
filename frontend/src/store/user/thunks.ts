import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { dropToken, saveToken } from '../../services/token';
import { LoggedUser, Questionnaire, User, UserAuth, UserRegister } from '../../types/user/user';
import { AppDispatch, State } from '../../types/state';

export const checkAuthAction = createAsyncThunk<LoggedUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.post<LoggedUser>(APIRoute.CheckAuth);
    return data;
  },
);

export const loginAction = createAsyncThunk<LoggedUser, UserAuth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<LoggedUser>(APIRoute.Login, { email, password });
    saveToken(data.accessToken);
    return data;
  },
);

export const registerAction = createAsyncThunk<LoggedUser, /*UserRegister*/FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async (formData , { extra: api }) => {
    const { data } = await api.post<LoggedUser>(APIRoute.Users, formData);
    saveToken(data.accessToken);
    return data;
  }
);

export const editUserAction = createAsyncThunk<User, User, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/edit',
  async (user , { extra: api }) => {
    const { data } = await api.patch<User>(APIRoute.Users, user);
    return data;
  }
);

export const addQuestionnaireAction = createAsyncThunk<User, Questionnaire, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/questionnaire',
  async (questionnaire , { extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Questionnaire, questionnaire);
    return data;
  }
);