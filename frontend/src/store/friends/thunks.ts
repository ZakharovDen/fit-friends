import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user/user";
import { UserQueryParams } from "../../types/user/user-query-params";
import { AppDispatch, State } from "../../types/state";
import { AxiosInstance } from "axios";
import { APIRoute } from "../const";

export const fetchUsersAction = createAsyncThunk<User[], UserQueryParams | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getUsersLookForCompany',
  async (queryParams: UserQueryParams | undefined, { extra: api }) => {
    let query = '';
    if (queryParams) {
      const { level, locations, role, specializations } = queryParams;
      if (level) {
        query += `&level=${level}`;
      }
      if (role) {
        query += `&role=${role}`;
      }
      if (locations) {
        for (const location of locations) {
          query += `&locations=${location}`;
        }
      }
      if (specializations) {
        for (const specialization of specializations) {
          query += `&specializations=${specialization}`;
        }
      }
    }
    const { data } = await api.get<User[]>(`${APIRoute.Users}?${query}`);
    return data;
  },
);

export const fetchFriendsAction = createAsyncThunk<User[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getFriends',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User[]>(`${APIRoute.Friends}`);
    return data;
  }
);

export const addFriendAction = createAsyncThunk<{ friendId: string }, { friendId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addFriend',
  async (data, { extra: api }) => {
    await api.post<void>(`${APIRoute.Friends}`, data);
    return data;
  }
);

export const deleteFriendAction = createAsyncThunk<{ friendId: string }, { friendId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/deleteFriend',
  async (data, { extra: api }) => {
    await api.delete<void>(`${APIRoute.Friends}`, { data });
    return data;
  }
);