import { Grid, InputAdornment, OutlinedInput } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";


export const StockGrid = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{fontWeight: 'bold'}}>재고수량</Grid>
      <Grid item xs={12}>
        <Controller
          name="stock"
          control={control}
          rules={{ min: 0 }}
          render={({
            field: { onChange }
          }) => (
            <OutlinedInput
              fullWidth
              onChange={(e) => onChange(Number(e.target.value))}
              type="number"
              defaultValue={0}
              endAdornment={<InputAdornment position="end">개</InputAdornment>}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};