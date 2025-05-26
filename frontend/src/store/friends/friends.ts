import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user/user";
import { NameSpace } from "../const";
import { fetchUsersAction } from "./thunks";

type InitialState = {
  users: User[];
};

const initialState: InitialState = {
  users: [],
};

export const friends = createSlice({
  name: NameSpace.Friends,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
})