import React, { ChangeEvent, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getList } from "../../actions/product";
import { useDispatch, useSelector } from "react-redux";
import productSlice from "@reducers/products";
import { Product, ResDto } from "../../type/product/product";
import { ReqDto } from "../../type/common/common";
import styled from "@emotion/styled";
import { getProductList } from './../../__mocks__/productList';

const DialogTableCell = styled(TableCell)`
  cursor: pointer;
`;

export const ProductsList = (props: any) => {
  // const dispatch = useDispatch();

  // const productResData: ResDto = useSelector(
  //   (state: any) => state.product.productResData
  // );
  // const productReqData: ReqDto = useSelector(
  //   (state: any) => state.product.productReqData
  // );
  // const getListDone: boolean = useSelector(
  //   (state: any) => state.product.getListDone
  // );

  // const dispatchGetList = (param: ReqDto) => {
  //   dispatch(getList(param));
  // };

  // const { resetGetListDone, setProductReqData } = productSlice.actions;

  // useEffect(() => {
  //   dispatchGetList(productReqData);
  // }, [productReqData]);

  // useEffect(() => {
  //   if (getListDone) {
  //     dispatch(resetGetListDone());
  //   }
  // }, [getListDone]);

  // const handleSizeChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const newSize = Number(event.target.value);
  //   dispatch(
  //     setProductReqData({
  //       size: newSize,
  //     })
  //   );
  // };

  // const handlePageChange = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   dispatch(
  //     setProductReqData({
  //       page: newPage,
  //     })
  //   );
  // };

  const productResData = {
    content: getProductList(10),
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>상품명</TableCell>
                <TableCell>상품타입</TableCell>
                <TableCell>상품상태</TableCell>
                <TableCell>과세타입</TableCell>
                <TableCell>판매시작일</TableCell>
                <TableCell>판매종료일</TableCell>
                <TableCell>판매가</TableCell>
                <TableCell>소비자가</TableCell>
                <TableCell>공급가</TableCell>
                <TableCell>등록자</TableCell>
                <TableCell>등록일</TableCell>
                <TableCell>수정자</TableCell>
                <TableCell>수정일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productResData.content.map((product: Product, index: number) => (
                <TableRow hover key={product.id} data-id={product.id}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.prdTp}</TableCell>
                  <TableCell>{product.prdSts}</TableCell>
                  <TableCell>{product.taxTp}</TableCell>
                  <TableCell>{product.startDate}</TableCell>
                  <TableCell>{product.endDate}</TableCell>
                  <TableCell>{product.salePrc}</TableCell>
                  <TableCell>{product.prdPrc}</TableCell>
                  <TableCell>{product.supplyPrc}</TableCell>
                  <TableCell>"등록자"</TableCell>
                  <TableCell>"등록일"</TableCell>
                  <TableCell>수정자</TableCell>
                  <TableCell>수정일</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {/* <TablePagination
        component="div"
        count={productResData.totalElements}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleSizeChange}
        page={productReqData.page}
        rowsPerPage={productReqData.size}
        rowsPerPageOptions={[5, 10, 20]}
      /> */}
    </Card>
  );
};
