import { createSlice } from "@reduxjs/toolkit";
import { getList } from "../actions/product";
import { reqDto } from "../dto/common/reqDto";

// 기본 state
export const initialState = {
  getListLoading: false,
  getListDone: false,
  productResData: {
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
  getListError: null,
  productReqData: {
    ...reqDto,
  },
};

// toolkit 사용방법
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetGetListDone(state) {
      state.getListDone = false;
    },
    setProductReqData(state, action) {
      state.productReqData = {
        ...state.productReqData,
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
        state.productResData = action.payload.resultData;
        state.getListDone = true;
      })
      .addCase(getList.rejected, (state: any, action) => {
        state.getListLoading = false;
        state.getListError = action.payload;
      }),
});

export default productSlice;
