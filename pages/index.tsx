import Head from "next/head";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import Router from "next/router";
import { login } from "../actions/auth";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  //mounted
  useEffect(() => {
    //remember 체크
    if (localStorage.getItem("camporest_remember")) {
      const rememberId = localStorage.getItem("camporest_remember") || "";
      setValue("email", rememberId);
      setRememberChecked(true);
    }
  }, []);

  const dispatch = useDispatch();

  //react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm<Inputs>();

  //remember
  const [rememberChecked, setRememberChecked] = useState(false);
  const checkRemember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberChecked(event.target.checked);
  };

  //loginDone
  const { loginDone } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (loginDone) {
      if (rememberChecked && !localStorage.getItem("camporest_remember")) {
        localStorage.setItem("camporest_remember", watch("email"));
      }
      Router.push("/dashboard");
    }
  }, [loginDone]);

  //로그인
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    const loginParam = {
      email: email,
      password: password,
    };
    // @ts-ignore
    dispatch(login(loginParam));
  };

  const errorMessage = {
    email: () => {
      let msg = "";
      if (errors.email?.type === "pattern") {
        msg = "정확한 이메일을 입력해주세요";
      } else if (!!errors.email) {
        msg = "아이디(이메일)을 입력해주세요";
      }
      return msg;
    },
    password: () => {
      let msg = "";
      if (errors.password?.type === "minLength") {
        msg = "비밀번호를 정확히 입력해주세요(6~12자리)";
      } else if (!!errors.password) {
        msg = "비밀번호를 입력해주세요";
      }
      return msg;
    },
  };

  const resetError = (item: any) => {
    clearErrors(item);
    if (!watch(item)) {
      setError(item, { type: "empty", message: "empty" });
    }
  };

  const formInfo = {
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
          resetError("email");
        },
      },
      error: !!errors.email,
      errorMessage: errorMessage.email(),
    },
    password: {
      label: "비밀번호(6~12자리)",
      value: {
        ...register("password", {
          required: true,
          minLength: 4,
        }),
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setValue("password", e.target.value.substring(0, 12));
          resetError("password");
        },
      },
      error: !!errors.password,
      errorMessage: errorMessage.password(),
    },
  };

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ my: 3, mb: 10 }}>
              <Typography color="textPrimary" variant="h4">
                관리자 로그인
              </Typography>
            </Box>
            <TextField
              fullWidth
              label={formInfo.email.label}
              {...formInfo.email.value}
              error={formInfo.email.error}
              helperText={formInfo.email.errorMessage}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              type="password"
              label={formInfo.password.label}
              {...formInfo.password.value}
              error={formInfo.password.error}
              helperText={formInfo.password.errorMessage}
              margin="normal"
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                로그인
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
