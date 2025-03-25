import { combineReducers } from '@reduxjs/toolkit';
import { user } from './user/user';
import { NameSpace } from './const';
import { training } from './training/training';

export const rootReducer = combineReducers({
  [NameSpace.User]: user.reducer,
  [NameSpace.Training]: training.reducer
});
