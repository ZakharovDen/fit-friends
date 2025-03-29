import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../../types/state';
import { FeedbackWithUser } from '../../types/feedback/feedback';

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
