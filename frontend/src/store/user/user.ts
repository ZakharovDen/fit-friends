import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { addQuestionnaireAction, checkAuthAction, editUserAction, getUserInfoAction, loginAction, registerAction } from './thunks';
import { AuthorizationStatus } from '../../constant';
import { User } from '../../types/user/user';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
  isProcess: boolean;
  isSuccess: boolean;
  isQuestionnaireCompleted: boolean;
  userInfo: User | undefined;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  isProcess: false,
  isSuccess: false,
  isQuestionnaireCompleted: false,
  userInfo: undefined,
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
        state.isQuestionnaireCompleted = (!!state.user.questionnaire);
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = undefined;
        state.isQuestionnaireCompleted = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.isQuestionnaireCompleted = (!!state.user.questionnaire);
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = undefined;
        state.isQuestionnaireCompleted = (false);
      })
      .addCase(registerAction.pending, (state) => {
        state.isProcess = true;
        state.isSuccess = false;
      })
      .addCase(registerAction.rejected, (state) => {
        state.isProcess = false;
        state.isSuccess = false;
        state.isQuestionnaireCompleted = (false);
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isProcess = false;
        state.isSuccess = true;
        state.isQuestionnaireCompleted = (!!state.user.questionnaire);
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(addQuestionnaireAction.pending, (state) => {
        state.isProcess = true;
        state.isSuccess = false;
      })
      .addCase(addQuestionnaireAction.rejected, (state) => {
        state.isProcess = false;
        state.isSuccess = false;
      })
      .addCase(addQuestionnaireAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isProcess = false;
        state.isSuccess = true;
        state.isQuestionnaireCompleted = (!!state.user.questionnaire);
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
      })
      .addCase(getUserInfoAction.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});
