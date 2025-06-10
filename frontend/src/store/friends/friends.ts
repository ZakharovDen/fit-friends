import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user/user";
import { NameSpace } from "../const";
import { fetchFriendsAction, fetchUsersAction } from "./thunks";
import { Friend } from "../../types/friend/friend";

type InitialState = {
  users: User[];
  isLoading: boolean;
  error: boolean;
  friends: Friend[];
};

const initialState: InitialState = {
  users: [],
  isLoading: false,
  error: false,
  friends: []
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
      }).addCase(fetchFriendsAction.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchFriendsAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchFriendsAction.rejected, (state) => {
        state.friends = [];
        state.isLoading = false;
        state.error = true;
      });
  },
})