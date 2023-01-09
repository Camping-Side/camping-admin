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
import { getList, getDetail } from "../../actions/account";
import { useDispatch, useSelector } from "react-redux";
import accountSlice from "@reducers/account";
import { Account, ResDto } from "../../type/accounts/accounts";
import { ReqDto } from "../../type/common/common";
import styled from "@emotion/styled";
import { birthFilter, phoneFilter } from "../../util/commonFilter";
import { AccountsDialog } from "@cp/accounts/accountsDialog";

const DialogTableCell = styled(TableCell)`
  cursor: pointer;
`;

export const AccountsList = (props: any) => {
  //dialog
  const [open, setOpen] = useState(false);

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
  const getDetailDone: boolean = useSelector(
    (state: any) => state.account.getDetailDone
  );

  const dispatchGetList = (param: ReqDto) => {
    dispatch(getList(param));
  };

  const dispatchGetDetail = (id: string) => {
    dispatch(getDetail(id));
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const { resetGetListDone, setAccountReqData, resetGetDetailDone } =
    accountSlice.actions;

  useEffect(() => {
    dispatchGetList(accountReqData);
  }, [accountReqData]);

  useEffect(() => {
    if (getListDone) {
      dispatch(resetGetListDone());
    }
    if (getDetailDone) {
      handleClickOpenDialog();
      dispatch(resetGetDetailDone());
    }
  }, [getListDone, getDetailDone]);

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
              {accountResData.content.map((account: Account, index: number) => (
                <TableRow hover key={account.id}>
                  <TableCell>
                    {accountResData.totalElements -
                      index -
                      accountResData.number * accountResData.size}
                  </TableCell>
                  <TableCell>{account.activated ? "O" : "X"}</TableCell>
                  <DialogTableCell
                    onClick={() => {
                      dispatchGetDetail(account.id);
                    }}
                  >
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
                        {account.username}
                      </Typography>
                    </Box>
                  </DialogTableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{birthFilter(account.birth)}</TableCell>
                  <TableCell>{phoneFilter(account.phone)}</TableCell>
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
      {open && <AccountsDialog open={open} setOpen={setOpen} />}
    </Card>
  );
};
