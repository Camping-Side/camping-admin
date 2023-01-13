import Head from "next/head";
import Link from 'next/link'
import { Box, Button, Container, Typography } from "@mui/material";
import { ProductsList } from "@cp/products/productsList";
import { DashboardLayout } from "@cp/dashboard-layout";
import { BasicSearchBar } from "@cp/common/BasicSearchBar";
import { useDispatch } from "react-redux";
import { ReqDto } from "../../type/common/common";
import productSlice from "@reducers/products";

const Index = () => {
  const dispatch = useDispatch();

  const { setProductReqData } = productSlice.actions;

  const setReqDto = (reqDto: ReqDto) => {
    dispatch(setProductReqData(reqDto));
  };

  return (
    <>
      <Head>
        <title>상품관리</title>
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
                상품관리
              </Typography>
              <Box sx={{ m: 1 }}>
                <Link href='/product/add'>
                  <Button color="primary" variant="contained">
                    + 상품추가
                  </Button>
                </Link>
              </Box>
            </Box>
            <BasicSearchBar
              textField={{
                isShow: true,
                placeholder: "상품명으로 검색해주세요.",
              }}
              datePicker={{
                isShow: true,
              }}
              action={setReqDto}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <ProductsList />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Index.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Index;
