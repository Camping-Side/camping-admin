import Head from "next/head";
import { Box, Card, CardContent, Container } from "@mui/material";
import { DashboardLayout } from "@cp/dashboard-layout";
import { useDispatch } from "react-redux";
import { ReqDto } from "../../type/common/common";
import { AddForm } from "@cp/products/AddForm";

export interface Category {
  id: number,
  title: string,
  childIds: number[]
}

const Add = () => {
  return (
    <>
      <Head>
        <title>상품 추가</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Card>
            <CardContent sx={{ display: 'grid', gap: 2 }}>
              <AddForm />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Add.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Add;
