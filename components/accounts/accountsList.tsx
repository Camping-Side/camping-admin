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
import { getList } from "../../actions/account";
import { useDispatch, useSelector } from "react-redux";
import accountSlice from "@reducers/account";

type AccountData = {
  content: [];
  pageable: object;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: object;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

type Account = {
  id: string | never;
  username: string;
  phone: string;
  email: string;
  birth: string;
};

export const AccountsList = ({ ...rest }) => {
  const dispatch = useDispatch();
  /*const { accountResData, getListDone, accountReqData } = useSelector(
    (state: any) => state.account
  );*/

  const accountResData = useSelector(
    (state: any) => state.account.accountResData
  );
  console.log("accountResData");
  //const [totalCnt, setTotalCnt] = useState(0);

  /*const dispatchGetList = (param) => {
    dispatch(getList(param));
  };*/

  //mounted
  useEffect(() => {
    dispatch(getList({ page: 1, size: 10 }));
    //dispatchGetList(accountReqData);
  }, []);

  /*useEffect(() => {
    if (getListDone) {
      setAccountList(accountResData.content);
      setTotalCnt(accountResData.totalElements);
      accountSlice.actions.resetGetListDone();
    }
  }, [getListDone]);*/

  /*const handleSizeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newSize = Number(event.target.value);
    accountSlice.actions.setRequestParam({
      size: newSize,
    });
    //dispatchGetList(accountReqData);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    accountSlice.actions.setRequestParam({
      page: newPage,
    });
    //dispatchGetList(accountReqData);
  };*/

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
              {/*{accountList
                .slice(0, accountResData.size)
                .map((account: Account, index: number) => (
                  <TableRow hover key={account.id}>
                    <TableCell>{totalCnt - index}</TableCell>
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
                ))}*/}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {/*<TablePagination
        component="div"
        count={totalCnt}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleSizeChange}
        page={accountReqData.page}
        rowsPerPage={accountReqData.size}
        rowsPerPageOptions={[5, 10, 20]}
      />*/}
    </Card>
  );
};

/*AccountList.propTypes = {
  customers: PropTypes.array.isRequired,
};*/
