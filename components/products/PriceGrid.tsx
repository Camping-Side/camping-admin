// import { BaseDateRangePicker } from "@cp/common/BaseDateRangePicker";
import { Box, Grid, InputAdornment, OutlinedInput, ToggleButton, ToggleButtonGroup } from "@mui/material";
import VerticalCenterGrid from "@cp/common/VerticalCenterGrid";
import {  useState } from "react";
import { Controller, useFormContext } from "react-hook-form";


export const PriceGrid = () => {
  const { control } = useFormContext();

  const [isDiscount, setIsDiscount] = useState(false);
  const [hasDate, setHasDate] = useState(false);

  return (
    <VerticalCenterGrid container spacing={1}>
      <Grid item xs={12} sx={{fontWeight: 'bold'}}>판매가</Grid>
      <Grid item xs={2}/* sx={VERTOCAL_CENTER_STYLE}*/>판매가</Grid>
      <Grid item xs={10}>
        <Controller
          name="price"
          control={control}
          render={({
            field: { onChange }
          }) => (
            <OutlinedInput
              fullWidth
              onChange={onChange}
              type="number"
              defaultValue={0}
              endAdornment={<InputAdornment position="end">원</InputAdornment>}
            />
          )}
        />
      </Grid>
      <Grid item xs={2}/* sx={VERTOCAL_CENTER_STYLE}*/>
      할인
      </Grid>
      <Grid item xs={10}>
        <ToggleButtonGroup value={isDiscount} exclusive onChange={(_e, newValue) => setIsDiscount(newValue)}>
          <ToggleButton value={true}>설정함</ToggleButton>
          <ToggleButton value={false}>설정안함</ToggleButton>
        </ToggleButtonGroup>
        {isDiscount &&
          <Box sx={{ gap: 1 }}>
            할인가 : 
            <Controller
              name="discountPrice"
              control={control}
              render={({
                field: { onChange }
              }) => (
                <OutlinedInput type="number" onChange={onChange} endAdornment={<InputAdornment position="end">원</InputAdornment>} />
              )}
            />
            
            <Controller
              name="discountType"
              control={control}
              render={({
                field
              }) => (
                <ToggleButtonGroup exclusive {...field} >
                  <ToggleButton value='pc'>PC만 할인</ToggleButton>
                  <ToggleButton value='mobile'>모바일만 할인</ToggleButton>
                  <ToggleButton value='all'>전체 할인</ToggleButton>
                </ToggleButtonGroup>
              )}
            />
          </Box>
        }
      </Grid>
      <Grid item xs={2}>판매기간</Grid>
      <Grid item xs={10}>
        <ToggleButtonGroup value={hasDate} exclusive onChange={(_e, newValue) => setHasDate(newValue)}>
          <ToggleButton value={true}>설정함</ToggleButton>
          <ToggleButton value={false}>설정안함</ToggleButton>
        </ToggleButtonGroup>
        {/* {hasDate &&
          <Controller
            name="dateRange"
            control={control}
            render={() => (
              <BaseDateRangePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            )}
          />
        } */}
      </Grid>
      <Grid item xs={2}>부가세</Grid>
      <Grid item xs={10}>
        <Controller
          name="texType"
          control={control}
          defaultValue='taxable'
          render={({
            field
          }) => (
            <ToggleButtonGroup exclusive {...field}>
              <ToggleButton value='taxable'>과세상품</ToggleButton>
              <ToggleButton value='free'>면세상품</ToggleButton>
              <ToggleButton value='smallScale'>영세상품</ToggleButton>
            </ToggleButtonGroup>
          )}
        />
      </Grid>
    </VerticalCenterGrid>
  );
};