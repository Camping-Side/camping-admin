import Head from "next/head";
import { Box, Button, Container, Typography } from "@mui/material";
import { AccountsList } from "@cp/accounts/accountsList";
import { DashboardLayout } from "@cp/dashboard-layout";
import { BasicSearchBar } from "@cp/common/BasicSearchBar";
import { useDispatch } from "react-redux";
import { ReqDto } from "../../type/common/common";
import accountSlice from "@reducers/account";

const Index = () => {
  const dispatch = useDispatch();

  const { setAccountReqData } = accountSlice.actions;

  const setReqDto = (reqDto: ReqDto) => {
    dispatch(setAccountReqData(reqDto));
  };

  return (
    <>
      <Head>
        <title>회원관리</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h4">
                회원관리
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button color="primary" variant="contained">
                  + 회원추가
                </Button>
              </Box>
            </Box>
            <BasicSearchBar
              textField={{
                isShow: true,
                placeholder: "email or 이름으로 검색해주세요.",
              }}
              datePicker={{
                isShow: true,
              }}
              action={setReqDto}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <AccountsList />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Index.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Index;
