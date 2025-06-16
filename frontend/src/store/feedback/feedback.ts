import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { FeedbackWithUser } from '../../types/feedback/feedback';
import { createFeedbackAction, getFeedbacksAction } from './thunks';

type InitialState = {
  feedbacks: FeedbackWithUser[];
  isFeedbacksDataLoading: boolean;
  hasError: boolean;
  isProcess: boolean;
  isSuccess: boolean;
};

const initialState: InitialState = {
  feedbacks: [],
  hasError: false,
  isFeedbacksDataLoading: false,
  isProcess: false,
  isSuccess: false,
};

export const feedback = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeedbacksAction.pending, (state) => {
        state.isFeedbacksDataLoading = true;
        state.hasError = false;
      })
      .addCase(getFeedbacksAction.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
        state.isFeedbacksDataLoading = false;
      })
      .addCase(getFeedbacksAction.rejected, (state) => {
        state.isFeedbacksDataLoading = false;
        state.hasError = true;
      })
      .addCase(createFeedbackAction.pending, (state) => {
        state.isProcess = true;
        state.isSuccess = false;
      })
      .addCase(createFeedbackAction.rejected, (state) => {
        state.isProcess = false;
        state.isSuccess = false;
      })
      .addCase(createFeedbackAction.fulfilled, (state, action) => {
        state.feedbacks.push(action.payload);
        state.isProcess = false;
        state.isSuccess = true;
      });
  },
});
