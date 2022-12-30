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

const DialogTableCell = styled(TableCell)`
  cursor: pointer;
`;

export const ProductsList = (props: any) => {
  const dispatch = useDispatch();

  const productResData: ResDto = useSelector(
    (state: any) => state.product.productResData
  );
  const productReqData: ReqDto = useSelector(
    (state: any) => state.product.productReqData
  );
  const getListDone: boolean = useSelector(
    (state: any) => state.product.getListDone
  );

  const dispatchGetList = (param: ReqDto) => {
    dispatch(getList(param));
  };

  const { resetGetListDone, setProductReqData } = productSlice.actions;

  useEffect(() => {
    dispatchGetList(productReqData);
  }, [productReqData]);

  useEffect(() => {
    if (getListDone) {
      dispatch(resetGetListDone());
    }
  }, [getListDone]);

  const handleSizeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newSize = Number(event.target.value);
    dispatch(
      setProductReqData({
        size: newSize,
      })
    );
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(
      setProductReqData({
        page: newPage,
      })
    );
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>활성여부</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>휴대폰번호</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productResData.content.map((product: Product, index: number) => (
                <TableRow hover key={product.id}>
                  <TableCell>
                    {productResData.totalElements -
                      index -
                      productResData.number * productResData.size}
                  </TableCell>
                  <TableCell>{product.activated ? "O" : "X"}</TableCell>
                  <DialogTableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography
                        color="blue"
                        sx={{ textDecoration: "underline" }}
                        variant="body1"
                      >
                        {product.username}
                      </Typography>
                    </Box>
                  </DialogTableCell>
                  <TableCell>{product.email}</TableCell>
                  <TableCell>{product.birth}</TableCell>
                  <TableCell>{product.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={productResData.totalElements}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleSizeChange}
        page={productReqData.page}
        rowsPerPage={productReqData.size}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Card>
  );
};
