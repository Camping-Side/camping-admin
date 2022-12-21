import { createSlice } from "@reduxjs/toolkit";
import { getList } from "../actions/account";

// 기본 state
export const initialState = {
  getListLoading: false,
  getListDone: false,
  accountResData: false,
  getListError: null,
  accountReqData: {
    keyword: null,
    page: 0,
    size: 10,
  },
};

// toolkit 사용방법
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetGetListDone(state) {
      console.log("state: ", state);
      state.getListDone = false;
    },
    setRequestParam(state, param) {
      console.log("state: ", state);
      console.log("param: ", param);
      state.accountReqData = {
        ...state.accountReqData,
        ...param,
      };
    },
  },
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
        state.accountResData = action.payload.resultData;
        state.getListDone = true;
      })
      .addCase(getList.rejected, (state: any, action) => {
        state.getListLoading = false;
        state.getListError = action.payload;
      }),
});

export default accountSlice;
