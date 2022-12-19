import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const DOMAIN = process.env.NEXT_PUBLIC_API_URL;

export const getList = createAsyncThunk(
  "account/getList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        DOMAIN + "/api/v1/admin/accounts?page=1&size=2"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
