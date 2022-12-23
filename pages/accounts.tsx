import Head from "next/head";
import { Box, Button, Container, Typography } from "@mui/material";
import { AccountsList } from "../components/accounts/accountsList";
import { DashboardLayout } from "../components/dashboard-layout";
import { Upload as UploadIcon } from "../icons/upload";
import { Download as DownloadIcon } from "../icons/download";
import { BasicSearchBar } from "@cp/common/BasicSearchBar";

const Page = () => {
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
                <Button
                  startIcon={<UploadIcon fontSize="small" />}
                  sx={{ mr: 1 }}
                >
                  Import
                </Button>
                <Button
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ mr: 1 }}
                >
                  Export
                </Button>
                <Button color="primary" variant="contained">
                  Add Customers
                </Button>
              </Box>
            </Box>
            <BasicSearchBar
              textField={{
                isShow: true,
                placeholder: "email or 이름으로 검색해주세요.",
              }}
              showDatePicker={true}
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

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
