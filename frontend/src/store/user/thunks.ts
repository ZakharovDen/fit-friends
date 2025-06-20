import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { saveToken } from '../../services/token';
import { LoggedUser, Questionnaire, User, UserAuth, UserUpdate } from '../../types/user/user';
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

export const registerAction = createAsyncThunk<LoggedUser, FormData, {
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

export const editUserAction = createAsyncThunk<User, UserUpdate, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/edit',
  async (userData , { extra: api }) => {
    const { data } = await api.patch<User>(APIRoute.Users, userData);
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

export const getUserInfoAction = createAsyncThunk<User, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getUserInfo',
  async (id, { extra: api }) => {
    const { data } = await api.get<User>(`${APIRoute.Users}/${id}`);
    return data;
  },
);
