import { ChangeEvent, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { getList } from "../../actions/account";
import { useDispatch } from "react-redux";

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

export const AccountList = ({
  accountData,
  ...rest
}: {
  accountData: AccountData;
}) => {
  const dispatch = useDispatch();

  const [selectedIdList, SetSelectedIdList] = useState([]);

  const [size, setSize] = useState(accountData.size);
  const [page, setPage] = useState(accountData.number);
  const [accountList, setAccountList] = useState(accountData.content);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = accountList.map(
        (account: Account) => account.id
      );
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSizeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSize(Number(event.target.value));
  };

  const handlePageChange = (event: MouseEvent | null, newPage: number) => {
    setPage(newPage);
    dispatch(
      getList({
        size: size,
        page: page,
      })<AsyncThunkAction<any, void, AsyncThunkConfig>>
    );
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIdList.length === accountList.length}
                    color="primary"
                    indeterminate={
                      selectedIdList.length > 0 &&
                      selectedIdList.length < accountList.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>이름</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>휴대폰번호</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountList.slice(0, size).map((account: Account) => (
                <TableRow
                  hover
                  key={account.id}
                  selected={selectedIdList.indexOf(account.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIdList.indexOf(account.id) !== -1}
                      onChange={(event) => handleSelectOne(event, account.id)}
                      value="true"
                    />
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
        count={accountList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleSizeChange}
        page={page}
        rowsPerPage={size}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AccountList.propTypes = {
  customers: PropTypes.array.isRequired,
};
