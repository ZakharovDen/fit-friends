import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { checkAuthAction, editUserAction, loginAction } from './thunks';
import { AuthorizationStatus } from '../../constant';
import { User } from '../../types/user/user';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
  isProcess: boolean;
  isSuccess: boolean;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  isProcess: false,
  isSuccess: true,
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
      })
      .addCase(editUserAction.pending, (state) => {
        state.isProcess = true;
        state.isSuccess = false;
      })
      .addCase(editUserAction.rejected, (state) => {
        state.isProcess = false;
        state.isSuccess = false;
      })
      .addCase(editUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isProcess = false;
        state.isSuccess = true;
      });
  },
});
