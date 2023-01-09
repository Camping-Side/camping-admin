import api from "../util/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Account } from "../type/accounts/accounts";
import { ReqDto } from "../type/common/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMyInfo = createAsyncThunk(
  "account/getMyInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/accounts/me");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getList = createAsyncThunk(
  "account/getList",
  async (data: ReqDto, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/accounts", {
        params: data,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetail = createAsyncThunk(
  "account/getDetail",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/accounts/" + data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update = createAsyncThunk(
  "account/update",
  async (data: Account, { rejectWithValue }) => {
    try {
      const response = await api.put(
        BASE_URL + "/api/v1/accounts/" + data.id,
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
