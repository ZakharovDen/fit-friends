import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user/user";
import { UserQueryParams } from "../../types/user/user-query-params";
import { AppDispatch, State } from "../../types/state";
import { AxiosInstance } from "axios";
import { APIRoute } from "../const";

export const fetchUsersAction = createAsyncThunk<User[], UserQueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getUserInfo',
  async (queryParams: UserQueryParams, { extra: api }) => {
    const { level, locations, role, specializations } = queryParams;
    let query = '';
    if (level) {
      query += `&level=${level}`;
    }
    if (role) {
      query += `&role=${role}`;
    }
    if (locations) {
      for (const location of locations) {
        query += `&location=${location}`;
      }
    }
    if (specializations) {
      for (const specialization of specializations) {
        query += `&specialization=${specialization}`;
      }
    }
    const { data } = await api.get<User[]>(`${APIRoute.Users}?${query}`);
    return data;
  },
);