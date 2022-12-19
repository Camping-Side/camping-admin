import Head from "next/head";
import { Box, Container } from "@mui/material";
import { AccountList } from "../components/customer/accountList";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../actions/account";

const Page = () => {
  const dispatch = useDispatch();
  const { accountData } = useSelector((state: any) => state.account);

  useEffect(() => {
    // @ts-ignore
    dispatch(
      getList({
        size: 10,
        page: 1,
      })
    );
  }, []);

  return (
    <>
      <Head>
        <title>회원관리 | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <AccountList account={accountData.content} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
