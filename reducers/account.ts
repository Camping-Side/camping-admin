import { createSlice } from "@reduxjs/toolkit";
import { getMyInfo, getList, getDetail, update } from "../actions/account";
import { reqDto } from "../dto/common/reqDto";

// 기본 state
export const initialState = {
  getMyInfoLoading: false,
  getMyInfoDone: false,
  getMyInfoError: null,
  myInfo: {},
  accountReqData: {
    ...reqDto,
  },
  getListLoading: false,
  getListDone: false,
  getListError: null,
  accountResData: {
    content: [],
    pageable: {},
    last: false,
    totalPages: 0,
    totalElements: 0,
    size: 10,
    number: 0,
    sort: {},
    first: false,
    numberOfElements: 0,
    empty: false,
  },
  getDetailLoading: false,
  getDetailDone: false,
  getDetailError: null,
  accountDetail: {},
  updateLoading: false,
  updateDone: false,
  updateError: null,
};

// toolkit 사용방법
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetGetListDone(state) {
      state.getListDone = false;
    },
    resetGetDetailDone(state) {
      state.getDetailDone = false;
    },
    resetUpdateDone(state) {
      state.updateDone = false;
    },
    setAccountReqData(state, action) {
      state.accountReqData = {
        ...state.accountReqData,
        ...action.payload,
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
      })
      //회원상세
      .addCase(getDetail.pending, (state) => {
        state.getDetailDone = false;
        state.getDetailLoading = true;
        state.getDetailError = null;
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        state.getDetailLoading = false;
        state.accountDetail = action.payload.resultData;
        state.getDetailDone = true;
      })
      .addCase(getDetail.rejected, (state: any, action) => {
        state.getDetailLoading = false;
        state.getDetailError = action.payload;
      })
      //회원정보수정
      .addCase(update.pending, (state) => {
        state.updateDone = false;
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateDone = true;
      })
      .addCase(update.rejected, (state: any, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })
      //내정보가져오기
      .addCase(getMyInfo.pending, (state) => {
        state.getMyInfoDone = false;
        state.getMyInfoLoading = true;
        state.getMyInfoError = null;
      })
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.getMyInfoLoading = false;
        state.myInfo = action.payload.resultData;
        state.getMyInfoDone = true;
      })
      .addCase(getMyInfo.rejected, (state: any, action) => {
        state.getMyInfoLoading = false;
        state.getMyInfoError = action.payload;
      }),
});

export default accountSlice;
