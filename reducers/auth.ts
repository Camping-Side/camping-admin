import { createSlice } from "@reduxjs/toolkit";
import { login, reissueToken } from "../actions/auth";

// 기본 state
export const initialState = {
  loginInfo: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  reissueTokenInfo: null,
  reissueTokenLoading: false,
  reissueTokenDone: false,
  reissueTokenError: null,
};

// toolkit 사용방법
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.loginDone = false;
      state.loginInfo = null;
      localStorage.removeItem("camporest_admin_auth");
    },
  },
  extraReducers: (builder) =>
    builder
      // 로그인
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginInfo = action.payload.resultData;
        console.log("login: ", action.payload.resultData);
        if (localStorage.getItem("camporest_admin_auth")) {
          localStorage.removeItem("camporest_admin_auth");
        }
        localStorage.setItem(
          "camporest_admin_auth",
          JSON.stringify(action.payload.resultData)
        );
        state.loginDone = true;
      })
      .addCase(login.rejected, (state: any, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      // 토큰재발급
      .addCase(reissueToken.pending, (state) => {
        state.reissueTokenLoading = true;
        state.reissueTokenDone = false;
        state.reissueTokenError = null;
      })
      .addCase(reissueToken.fulfilled, (state, action) => {
        state.reissueTokenLoading = false;
        state.reissueTokenInfo = action.payload.resultData;
        if (localStorage.getItem("camporest_admin_auth")) {
          localStorage.removeItem("camporest_admin_auth");
        }
        localStorage.setItem(
          "camporest_admin_auth",
          JSON.stringify(action.payload.resultData)
        );
        state.reissueTokenDone = true;
      })
      .addCase(reissueToken.rejected, (state: any, action) => {
        state.reissueTokenLoading = false;
        state.reissueTokenError = action.payload;
      }),
});

export default authSlice;
