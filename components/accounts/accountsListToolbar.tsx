import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { getList } from "../../actions/account";

export const AccountsListToolbar = (props: any) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const dispatchGetList = (size: number, newPage: number) => {
    dispatch(
      getList({
        size: size,
        page: newPage,
      })
    );
  };

  return (
    <Box {...props}>
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
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>
          <Button color="primary" variant="contained">
            Add Customers
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="email or 이름으로 검색해주세요."
                variant="outlined"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
