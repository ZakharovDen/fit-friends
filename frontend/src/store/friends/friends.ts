import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user/user";
import { NameSpace } from "../const";
import { getUsers } from "./thunks";

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
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
})