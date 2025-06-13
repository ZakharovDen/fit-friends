import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user/user";
import { NameSpace } from "../const";
import { fetchFriendsAction, fetchUsersAction, patchRequestAction, postRequestAction } from "./thunks";
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
      })
      .addCase(patchRequestAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(patchRequestAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(patchRequestAction.fulfilled, (state, action) => {
        const index = state.friends.findIndex((item) => item.request.id === action.payload.id);
        state.friends[index].request.status = action.payload.status;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(postRequestAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(postRequestAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(postRequestAction.fulfilled, (state, action) => {
        const index = state.friends.findIndex((item) => item.id === action.payload.userId);
        state.friends[index].request = action.payload;
        state.isLoading = false;
        state.error = false;
      });
  },
})