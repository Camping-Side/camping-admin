import React, { ChangeEvent, useEffect } from "react";
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
import { getList } from "../../actions/account";
import { useDispatch, useSelector } from "react-redux";
import accountSlice from "@reducers/account";
import { ReqDto, ResDto, Account } from "../../type/accounts/accounts";

export const AccountsList = ({ ...rest }) => {
  const dispatch = useDispatch();

  const accountResData: ResDto = useSelector(
    (state: any) => state.account.accountResData
  );
  const accountReqData: ReqDto = useSelector(
    (state: any) => state.account.accountReqData
  );
  const getListDone: boolean = useSelector(
    (state: any) => state.account.getListDone
  );

  const dispatchGetList = (param: ReqDto) => {
    dispatch(getList(param));
  };

  const { resetGetListDone, setAccountReqData } = accountSlice.actions;

  useEffect(() => {
    dispatchGetList(accountReqData);
  }, [accountReqData]);

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
      setAccountReqData({
        size: newSize,
      })
    );
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(
      setAccountReqData({
        page: newPage,
      })
    );
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>휴대폰번호</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountResData.content.map((account: Account, index: number) => (
                <TableRow hover key={account.id}>
                  <TableCell>
                    {accountResData.totalElements -
                      index -
                      accountResData.number * accountResData.size}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {account.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.birth}</TableCell>
                  <TableCell>{account.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={accountResData.totalElements}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleSizeChange}
        page={accountReqData.page}
        rowsPerPage={accountReqData.size}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Card>
  );
};
