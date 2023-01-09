import {
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface BaseDateRangePickerProps {
  startDate: string,
  setStartDate: Dispatch<SetStateAction<string>>,
  endDate: string,
  setEndDate: Dispatch<SetStateAction<string>>,
};
  
export const BaseDateRangePicker: FC<BaseDateRangePickerProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) => {
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

  return (
    <>
      <Grid item md={1} xs={12}>
        <Typography mt={2} align={"center"}>
          시작일
        </Typography>
      </Grid>
      <Grid item md={2} xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="시작일 선택"
            value={startDate}
            onChange={(value) => {
              setStartDate(value);
            }}
            renderInput={(params) => {
              params.error = false;
              return <TextField {...params} />;
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item md={1} xs={12}>
        <Typography mt={2} align={"center"}>
          종료일
        </Typography>
      </Grid>
      <Grid item md={2} xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="종료일 선택"
            value={endDate}
            onChange={(value) => {
              setEndDate(value);
            }}
            renderInput={(params) => {
              params.error = false;
              return <TextField {...params} />;
            }}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
};
  