import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute } from '../const';
import { TrainingsWithPagination } from '../../types/training/trainings-with-pagination';
import { Training, TrainingUpdateData, TrainingWithUser } from '../../types/training/training';
import { AllowedFilterValues } from '../../types/filter/allowed-filter-values';
import { TrainingQueryParams } from '../../types/training/training-query-params';

const getQuery = (queryParams: TrainingQueryParams) => {
  const {
    page,
    sortBy,
    sortOrder,
    limit,
    minPrice,
    maxPrice,
    minCalories,
    maxCalories,
    trainingType,
    isFree,
    trainingDuration,
    maxRating,
    minRating,
    userId
  } = queryParams;
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
  if (limit) {
    query += `&limit=${limit}`;
  }
  if (minCalories) {
    query += `&minCalories=${minCalories}`;
  }
  if (maxCalories) {
    query += `&maxCalories=${maxCalories}`;
  }
  if (trainingType) {
    for (const type of trainingType) {
      query += `&trainingType=${type}`;
    }
  }
  if (trainingDuration) {
    for (const duration of trainingDuration) {
      query += `&trainingDuration=${duration}`;
    }
  }
  if (isFree) {
    query += `&minPrice=${0}`;
    query += `&maxPrice=${0}`;
  } else {
    if (minPrice) {
      query += `&minPrice=${minPrice}`;
    }
    if (maxPrice) {
      query += `&maxPrice=${maxPrice}`;
    }
  }
  if (minRating) {
    query += `&minRating=${minRating}`;
  }
  if (maxRating) {
    query += `&maxRating=${maxRating}`;
  }
  if (userId) {
    query += `&userId=${userId}`;
  }
  return query;
};

export const fetchTrainingsAction = createAsyncThunk<TrainingsWithPagination, TrainingQueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchTrainings',
  async (queryParams: TrainingQueryParams, { extra: api }) => {
    const query = getQuery(queryParams);
    const result = await api.get<TrainingsWithPagination>(`${APIRoute.Trainings}?${query}`);
    return result.data;
  },
);

export const fetchMyTrainingsAction = createAsyncThunk<TrainingsWithPagination, TrainingQueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchMyTrainings',
  async (queryParams: TrainingQueryParams, { extra: api }) => {
    const query = getQuery(queryParams);
    const result = await api.get<TrainingsWithPagination>(`${APIRoute.MyTrainings}?${query}`);
    return result.data;
  },
);

export const getTrainingAction = createAsyncThunk<TrainingWithUser, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getTraining',
  async (id, { extra: api }) => {
    const { data } = await api.get<TrainingWithUser>(`${APIRoute.Trainings}/${id}`);
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
    const { data } = await api.post<Training>(APIRoute.Trainings, formData);
    return data;
  },
);

export const patchTrainingAction = createAsyncThunk<Training, TrainingUpdateData & { id?: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/patchTraining',
  async (trainingData, { extra: api }) => {
    const id = trainingData.id;
    delete trainingData.id;
    const { data } = await api.patch<Training>(`${APIRoute.Trainings}/${id}`, trainingData);
    return data;
  },
);

export const getFilterValuesAction = createAsyncThunk<AllowedFilterValues, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getFilterValues',
  async (authorId, { extra: api }) => {
    const { data } = await api.get<AllowedFilterValues>(`${APIRoute.Fit}/filter-values`, { params: { authorId } });
    return data;
  },
);

export const loadVideoAction = createAsyncThunk<{ videoUrl: string }, File, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postVideo',
  async (file, { extra: api }) => {
    const formData = new FormData();
    formData.append('video', file);
    const { data } = await api.post<{ videoUrl: string }>(APIRoute.TrainingsVideo, formData);
    return data;
  },
);
