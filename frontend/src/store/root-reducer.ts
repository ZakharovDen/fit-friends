import { combineReducers } from '@reduxjs/toolkit';
import { user } from './user/user';
import { NameSpace } from './const';

export const rootReducer = combineReducers({
  [NameSpace.User]: user.reducer,
});
