import { createSlice } from "@reduxjs/toolkit";
import { getList } from "../actions/account";

// 기본 state
export const initialState = {
  getListLoading: false,
  getListDone: false,
  accountData: false,
  getListError: null,
};

// toolkit 사용방법
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //회원목록
      .addCase(getList.pending, (state) => {
        state.getListDone = false;
        state.getListLoading = true;
        state.getListError = null;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.getListLoading = false;
        state.accountData = action.payload.resultData;
        state.getListDone = true;
      })
      .addCase(getList.rejected, (state: any, action) => {
        state.getListLoading = false;
        state.getListError = action.payload;
      }),
});

export default accountSlice;
