import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute } from '../const';
import { TrainingsWithPagination } from '../../types/training/trainings-with-pagination';
import { QueryParams } from '../../types/training/query-params';
import { Training } from '../../types/training/training';

export const fetchTrainingsAction = createAsyncThunk<TrainingsWithPagination, any, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchTrainings',
  async ({ page, sortBy, sortOrder }: QueryParams, { extra: api }) => {
    console.log('qqq');
    let query = '';
    if (page) {
      query += `&page=${page}`;
    }
    if (sortBy) {
      query += `&sortField=${sortBy}`;
    }
    if (sortOrder) {
      query += `&sortDirection=${sortOrder}`;
    }
    const result = await api.get<TrainingsWithPagination>(`${APIRoute.Trainings}?${query}`);
    return result.data;
  },
);

export const getTrainingAction = createAsyncThunk<Training, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getTraining',
  async (id, { extra: api }) => {
    const { data } = await api.get<Training>(`${APIRoute.Trainings}/${id}`);
    return data;
  },
);

export const deleteTrainingAction = createAsyncThunk<string, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/deleteTraining',
  async (id, { extra: api }) => {
    await api.delete<void>(`${APIRoute.Trainings}/${id}`);
    return id;
  },
);

export const postTrainingAction = createAsyncThunk<Training, FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postTraining',
  async (formData, { extra: api }) => {
    const { data } = await api.post<Training>(`${APIRoute.Trainings}`, formData);
    return data;
  },
);