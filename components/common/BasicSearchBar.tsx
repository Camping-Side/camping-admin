import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useState } from "react";
import React from "react";
import { BaseDateRangePicker } from "./BaseDateRangePicker";

export const BasicSearchBar = (props: any) => {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const convertDayjsToString = () => {
    if (!startDate || !endDate) return {};
    const startDateObject = startDate.toDate();
    const startDateString =
      "" +
      startDateObject.getFullYear() +
      (startDateObject.getMonth() + 1) +
      startDateObject.getDate();

    const endDateObject = endDate.toDate();
    const endDateString =
      "" +
      endDateObject.getFullYear() +
      (endDateObject.getMonth() + 1) +
      endDateObject.getDate();
    return {
      startDate: startDateString,
      endDate: endDateString,
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && keyword !== "") {
      const param = {
        keyword: keyword,
        ...convertDayjsToString(),
      };
      props.action(param);
    }
  };

  const handleOnSubmit = () => {
    const param = {
      keyword: keyword,
      ...convertDayjsToString(),
    };
    props.action(param);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={3}>
              {props.textField.isShow && (
                <>
                  <Grid item md={1} xs={12}>
                    <Typography mt={2} align={"center"}>
                      검색
                    </Typography>
                  </Grid>
                  <Grid item md={5} xs={12}>
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
                      onChange={(e) => {
                        setKeyword(e.target.value);
                      }}
                      placeholder={props.textField.placeholder}
                      variant="outlined"
                      onKeyDown={handleKeyDown}
                    />
                  </Grid>
                  <Grid item md={6}></Grid>
                </>
              )}
              {props.datePicker.isShow && (
                <BaseDateRangePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              )}
            </Grid>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleOnSubmit}
            >
              검색
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
