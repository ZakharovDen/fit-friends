import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user/user";
import { NameSpace } from "../const";
import { fetchUsersAction } from "./thunks";

type InitialState = {
  users: User[];
  isLoading: boolean;
  error: boolean;
};

const initialState: InitialState = {
  users: [],
  isLoading: false,
  error: false
};

export const friends = createSlice({
  name: NameSpace.Friends,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchUsersAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchUsersAction.rejected, (state) => {
        state.users = [];
        state.isLoading = false;
        state.error = true;
      });
  },
})