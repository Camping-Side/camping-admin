/** @jsxImportSource @emotion/react */
import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../layout/Layout";
import styled from "@emotion/styled";
import { checkEmailDup, checkPhoneDup } from "../../actions/account";
import { join } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import authSlice from "@reducers/auth";
import accountSlice from "@reducers/account";

type Inputs = {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordCheck: string;
  birth: string;
};

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const CheckDupBtn = styled(Button)`
  margin-top: 7pt;
`;

const Join: FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm<Inputs>();

  const { joinDone } = useSelector((state: any) => state.auth);
  const { isPhoneDup, checkPhoneDupDone, isEmailDup, checkEmailDupDone } =
    useSelector((state: any) => state.account);

  useEffect(() => {
    return () => {
      dispatch(accountSlice.actions.resetDupChecked());
    };
  }, []);

  useEffect(() => {
    if (joinDone) {
      alert("회원가입되었습니다");
      dispatch(authSlice.actions.joinDone());
      Router.push("/user/login");
    }
  }, [joinDone]);

  useEffect(() => {
    if (checkPhoneDupDone && isPhoneDup) {
      alert("중복된 휴대폰번호입니다.");
    } else if (checkPhoneDupDone && !isPhoneDup) {
      alert("사용가능한 휴대폰번호입니다.");
      clearErrors("phone");
    }
  }, [checkPhoneDupDone, isPhoneDup]);

  useEffect(() => {
    if (checkEmailDupDone && isEmailDup) {
      alert("중복된 아이디(이메일)입니다.");
    } else if (checkEmailDupDone && !isEmailDup) {
      alert("사용가능한 아이디(이메일)입니다.");
      clearErrors("email");
    }
  }, [checkEmailDupDone, isEmailDup]);

  const handleCheckPhoneDup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const phone = watch("phone");
    if (!phone) {
      alert("휴대폰번호를 입력하세요.");
      return;
    } else if (phone && phone.length < 10) {
      alert("휴대폰번호를 정확히 입력하세요.");
      return;
    }
    const checkPhoneDupParam = {
      phone: phone,
    };
    // @ts-ignore
    dispatch(checkPhoneDup(checkPhoneDupParam));
  };

  const handleCheckEmailDup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const email = watch("email");
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      alert("아이디(이메일)을 입력하세요.");
      return;
    } else if (!pattern.test(email)) {
      alert("아이디(이메일)을 정확히 입력하세요.");
      return;
    }
    const checkEmailDupParam = {
      email: email,
    };
    // @ts-ignore
    dispatch(checkEmailDup(checkEmailDupParam));
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { name, email, password, phone, birth } = data;
    const joinParam = {
      username: name,
      email: email,
      password: password,
      birth: birth,
      phone: phone,
    };
    // @ts-ignore
    dispatch(join(joinParam));
  };

  const errorMessage = {
    name: () => {
      return !!errors.name ? "이름을 입력하세요" : "";
    },
    phone: () => {
      let msg = "";
      if (errors.phone?.type === "minLength") {
        msg = "휴대폰번호를 정확히 입력해주세요";
      } else if (isPhoneDup) {
        msg = "중복된 휴대폰번호입니다";
      } else if (!!errors.phone) {
        msg = "휴대폰번호를 입력해주세요";
      }
      return msg;
    },
    email: () => {
      let msg = "";
      if (errors.email?.type === "pattern") {
        msg = "정확한 이메일을 입력해주세요";
      } else if (isEmailDup) {
        msg = "중복된 아이디(이메일)입니다";
      } else if (!!errors.email) {
        msg = "아이디(이메일)을 입력해주세요";
      }
      return msg;
    },
    password: () => {
      let msg = "";
      if (errors.password?.type === "minLength") {
        msg = "비밀번호를 정확히 입력해주세요(6~12자리)";
      } else if (watch("password") !== watch("passwordCheck")) {
        msg = "비밀번호가 서로 일치하지 않습니다";
      } else if (!!errors.password) {
        msg = "비밀번호를 입력해주세요";
      }
      return msg;
    },
    passwordCheck: () => {
      let msg = "";
      if (errors.passwordCheck?.type === "minLength") {
        msg = "비밀번호를 정확히 입력해주세요(6~12자리)";
      } else if (watch("password") !== watch("passwordCheck")) {
        msg = "비밀번호가 서로 일치하지 않습니다";
      } else if (!!errors.passwordCheck) {
        msg = "비밀번호를 입력해주세요";
      }
      return msg;
    },
    birth: () => {
      let msg = "";
      if (errors.birth?.type === "minLength") {
        msg = "생년월일을 정확히 입력해주세요(8자리)";
      } else if (!!errors.birth) {
        msg = "생년월일을 입력해주세요";
      }
      return msg;
    },
  };

  const serError = (item: any) => {
    clearErrors(item);
    if (!watch(item)) {
      setError(item, { type: "empty", message: "empty" });
    }
  };

  const formInfo = {
    name: {
      label: "이름",
      value: {
        ...register("name", { required: true }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setValue("name", e.target.value.substring(0, 9));
          serError("name");
        },
      },
      error: !!errors.name,
      errorMessage: errorMessage.name(),
    },
    phone: {
      label: "휴대폰번호(숫자만입력)",
      value: {
        ...register("phone", { required: true, minLength: 10 }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setValue(
            "phone",
            e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1")
              .substring(0, 11)
          );
          serError("phone");
        },
      },
      error: !!errors.phone || isPhoneDup,
      errorMessage: errorMessage.phone(),
      disabled: checkPhoneDupDone && !isPhoneDup,
    },
    email: {
      label: "아이디(이메일)",
      value: {
        ...register("email", {
          required: true,
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          serError("email");
        },
      },
      error: !!errors.email || isEmailDup,
      errorMessage: errorMessage.email(),
      disabled: checkEmailDupDone && !isEmailDup,
    },
    password: {
      label: "비밀번호(6~12자리)",
      value: {
        ...register("password", {
          required: true,
          minLength: 6,
        }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setValue("password", e.target.value.substring(0, 12));
          serError("password");
        },
      },
      error: !!errors.password || watch("password") !== watch("passwordCheck"),
      errorMessage: errorMessage.password(),
    },
    passwordCheck: {
      label: "비밀번호 확인(6~12자리)",
      value: {
        ...register("passwordCheck", {
          required: true,
          minLength: 6,
        }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setValue("passwordCheck", e.target.value.substring(0, 12));
          serError("passwordCheck");
        },
      },
      error:
        !!errors.passwordCheck || watch("password") !== watch("passwordCheck"),
      errorMessage: errorMessage.passwordCheck(),
    },
    birth: {
      label: "생년월일(8자리 숫자만입력)",
      value: {
        ...register("birth", { required: true, minLength: 8 }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setValue(
            "birth",
            e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1")
              .substring(0, 8)
          );
          serError("birth");
        },
      },
      error: !!errors.birth,
      errorMessage: !!errors.birth ? "생년월일을 입력해주세요" : "",
    },
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Boxs
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label={formInfo.name.label}
                    {...formInfo.name.value}
                    error={formInfo.name.error}
                    helperText={formInfo.name.errorMessage}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={formInfo.phone.label}
                    {...formInfo.phone.value}
                    error={formInfo.phone.error}
                    helperText={formInfo.phone.errorMessage}
                    disabled={formInfo.phone.disabled}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CheckDupBtn
                    variant="outlined"
                    size="medium"
                    onClick={handleCheckPhoneDup}
                  >
                    중복확인
                  </CheckDupBtn>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={formInfo.email.label}
                    {...formInfo.email.value}
                    error={formInfo.email.error}
                    helperText={formInfo.email.errorMessage}
                    disabled={formInfo.email.disabled}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CheckDupBtn
                    variant="outlined"
                    size="medium"
                    onClick={handleCheckEmailDup}
                  >
                    중복확인
                  </CheckDupBtn>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label={formInfo.password.label}
                    {...formInfo.password.value}
                    error={formInfo.password.error}
                    helperText={formInfo.password.errorMessage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label={formInfo.passwordCheck.label}
                    {...formInfo.passwordCheck.value}
                    error={formInfo.passwordCheck.error}
                    helperText={formInfo.passwordCheck.errorMessage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={formInfo.birth.label}
                    {...formInfo.birth.value}
                    error={formInfo.birth.error}
                    helperText={formInfo.birth.errorMessage}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                disabled={
                  !checkPhoneDupDone ||
                  isPhoneDup ||
                  !checkEmailDupDone ||
                  isEmailDup
                }
              >
                회원가입
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </Layout>
  );
};

export default Join;