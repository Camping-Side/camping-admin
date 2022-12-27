import React from "react";
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

export const AccountsDialog = (props: any) => {
  const handleClickCloseDialog = () => {
    props.setSelectedAccount({
      id: "",
      username: "",
      phone: "",
      email: "",
      birth: "",
      market_agree: 0,
      activated: false,
    });
    props.setOpen(false);
  };
  return (
    <div>
      <Dialog open={props.open} onClose={handleClickCloseDialog}>
        <DialogTitle>회원정보</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item md={4} xs={12}>
                <Typography mt={2} align={"center"}>
                  이름
                </Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  onChange={(e) => {}}
                  variant="outlined"
                  value={props.selectedAccount.username}
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
                  onChange={(e) => {}}
                  variant="outlined"
                  value={props.selectedAccount.email}
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
                  onChange={(e) => {}}
                  variant="outlined"
                  value={props.selectedAccount.birth}
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
                  onChange={(e) => {}}
                  variant="outlined"
                  value={props.selectedAccount.phone}
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
                  value={props.newActivatedValue}
                  onChange={(e) => {
                    props.setNewActivatedValue(e.target.value);
                  }}
                >
                  <MenuItem value={1}>O</MenuItem>
                  <MenuItem value={0}>X</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseDialog}>닫기</Button>
          <Button onClick={handleClickCloseDialog}>수정</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
