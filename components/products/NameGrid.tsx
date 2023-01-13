import VerticalCenterGrid from "@cp/common/VerticalCenterGrid";
import { Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const NameGrid = () => {
  const { control } = useFormContext();

  return (
    <VerticalCenterGrid container spacing={1}>
      <Grid item xs={2} sx={{ fontWeight: 'bold' }}>상품명</Grid>
      <Grid item xs={10}>
        <Controller
          name="productName"
          control={control}
          rules={{ maxLength: 30 }}
          render={({
            field: { onChange }
          }) => (
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={onChange}
            />
          )}
        />
      </Grid>
    </VerticalCenterGrid>
  );
};