import Head from "next/head";
import { Box, Container } from "@mui/material";
import { AccountsList } from "../components/accounts/accountsList";
import { AccountsListToolbar } from "../components/accounts/accountsListToolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => {
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
          <AccountsListToolbar />
          <Box sx={{ mt: 3 }}>
            <AccountsList />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
