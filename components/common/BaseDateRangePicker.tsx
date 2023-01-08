import {
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface BaseDateRangePickerValue {
  startDate: string | null,
  endDate: string | null,
}

interface BaseDateRangePickerProps {
  value: BaseDateRangePickerValue,
  onChange: (value: BaseDateRangePickerValue) => void,
};
  
export const BaseDateRangePicker: FC<BaseDateRangePickerProps> = ({
  value,
  onChange,
}) => {
  const validDate = (newValue: BaseDateRangePickerValue): BaseDateRangePickerValue => {
    if(!newValue.startDate || !newValue.endDate) {
      return newValue;
    }
    return newValue.startDate.toDate() <= newValue.endDate.toDate() ? newValue : value;
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
            value={value.startDate}
            onChange={(newStartDate) => {
              const newValue = validDate({
                startDate: newStartDate,
                endDate: value.endDate,
              });
              onChange(newValue);
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
            value={value.endDate}
            onChange={(newEndDate) => {
              const newValue = validDate({
                startDate: value.startDate,
                endDate: newEndDate,
              });
              onChange(newValue);
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
  