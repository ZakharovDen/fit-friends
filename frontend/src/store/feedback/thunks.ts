import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../../types/state';
import { FeedbackData, FeedbackWithUser } from '../../types/feedback/feedback';

export const getFeedbacksAction = createAsyncThunk<FeedbackWithUser[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getFeedbacks',
  async (trainingId, { extra: api }) => {
    const { data } = await api.get<FeedbackWithUser[]>(`${APIRoute.Feedbacks}/${trainingId}`);
    return data;
  },
);

export const createFeedbackAction = createAsyncThunk<FeedbackWithUser, FeedbackData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postFeedbacks',
  async (feedbackData, { extra: api }) => {
    const { data } = await api.post<FeedbackWithUser>(APIRoute.Feedbacks, feedbackData);
    return data;
  },
);