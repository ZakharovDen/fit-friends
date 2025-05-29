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
  'data/getUserInfo',
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