import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { checkAuthAction, loginAction } from './thunks';
import { AuthorizationStatus } from '../../constant';
import { User } from '../../types/user/user';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
};

export const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = undefined;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = undefined;
      });
  },
});
