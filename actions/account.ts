import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getList = createAsyncThunk(
  "account/getList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + "/api/v1/admin/accounts", {
        params: data,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
