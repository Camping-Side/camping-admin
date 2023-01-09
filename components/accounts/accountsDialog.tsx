import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import accountSlice from "@reducers/account";
import { update } from "../../actions/account";

type Inputs = {
  nickname: string;
  phone: string;
  birth: string;
  isActivated: string;
};

export const AccountsDialog = (props: any) => {
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
  const { resetUpdateDone } = accountSlice.actions;
  const { accountDetail, updateDone, isPhoneDup, checkPhoneDupDone } =
    useSelector((state: any) => state.account);
  const { loginInfo } = useSelector((state: any) => state.auth);

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (updateDone) {
      alert("수정되었습니다.");
      dispatch(resetUpdateDone());
      props.setOpen(false);
    }
  }, [updateDone]);

  const handleClickCloseDialog = () => {
    if (isChanged) {
      if (confirm("상세창을 닫으시겠습니까?")) {
        props.setOpen(false);
      }
    } else {
      props.setOpen(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!confirm("수정하시겠습니까?")) {
      return;
    }
    const { phone, birth, nickname, isActivated } = data;
    const updateParam = {
      ...accountDetail,
      nickname: nickname,
      birth: birth,
      phone: phone,
      activated: isActivated === "true",
    };
    console.log(updateParam);
    // @ts-ignore
    dispatch(update(updateParam));
  };

  const errorMessage = {
    nickname: () => {
      return !!errors.nickname ? "닉네임을 입력하세요" : "";
    },
    phone: () => {
      let msg = "";
      if (isPhoneDup) {
        msg = "중복된 휴대폰번호입니다";
      } else if (!!errors.phone) {
        msg = "휴대폰번호를 입력해주세요";
      }
      return msg;
    },
    birth: () => {
      let msg = "";
      if (!!errors.birth) {
        msg = "생년월일을 입력해주세요";
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
    nickname: {
      value: {
        defaultValue: accountDetail.nickname,
        ...register("nickname", {
          required: true,
          onChange: (e) => {
            setIsChanged(true);
            setValue("nickname", e.target.value.substring(0, 9));
            resetError("nickname");
          },
        }),
      },
      error: !!errors.nickname,
      errorMessage: errorMessage.nickname(),
    },
    phone: {
      value: {
        defaultValue: accountDetail.phone,
        ...register("phone", {
          required: true,
          onChange: (e) => {
            setIsChanged(true);
            const value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1")
              .substring(0, 11);
            setValue("phone", value);
            resetError("phone");
          },
        }),
      },
      error: !!errors.phone || isPhoneDup,
      errorMessage: errorMessage.phone(),
      disabled: checkPhoneDupDone && !isPhoneDup,
    },
    birth: {
      value: {
        defaultValue: accountDetail.birth,
        ...register("birth", {
          required: true,
          onChange: (e) => {
            setIsChanged(true);
            const value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1")
              .substring(0, 8);
            setValue("birth", value);
            resetError("birth");
          },
        }),
      },
      error: !!errors.birth,
      errorMessage: errorMessage.birth(),
    },
    isActivated: {
      value: {
        defaultValue: accountDetail.activated ? "true" : "false",
        ...register("isActivated", {
          required: true,
          onChange: (e) => {
            setIsChanged(true);
            setValue("isActivated", e.target.value);
          },
        }),
      },
      disabled: accountDetail.email === loginInfo.username,
    },
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClickCloseDialog}>
        <DialogTitle>회원정보</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item md={4} xs={12}>
                <Typography mt={2} align={"center"}>
                  이름
                </Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={accountDetail.username}
                  disabled={true}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item md={4} xs={12}>
                <Typography mt={2} align={"center"}>
                  Email
                </Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={accountDetail.email}
                  disabled={true}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item md={4} xs={12}>
                <Typography mt={2} align={"center"}>
                  닉네임
                </Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  {...formInfo.nickname.value}
                  error={formInfo.nickname.error}
                  helperText={formInfo.nickname.errorMessage}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item md={4} xs={12}>
                <Typography mt={2} align={"center"}>
                  생년월일
                </Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  {...formInfo.birth.value}
                  error={formInfo.birth.error}
                  helperText={formInfo.birth.errorMessage}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item md={4} xs={12}>
                <Typography mt={2} align={"center"}>
                  휴대폰번호
                </Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  {...formInfo.phone.value}
                  error={formInfo.phone.error}
                  helperText={formInfo.phone.errorMessage}
                  disabled={formInfo.phone.disabled}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item md={4} xs={12}>
                <Typography mt={2} align={"center"}>
                  활성여부
                </Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Select
                  fullWidth
                  {...formInfo.isActivated.value}
                  disabled={formInfo.isActivated.disabled}
                >
                  <MenuItem value={"true"}>O</MenuItem>
                  <MenuItem value={"false"}>X</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseDialog}>닫기</Button>
          <Button onClick={handleSubmit(onSubmit)}>수정</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
