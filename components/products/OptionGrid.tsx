import VerticalCenterGrid from "@cp/common/VerticalCenterGrid";
import { Grid, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

export const OptionGrid = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control,
  })

  return (
    <VerticalCenterGrid container spacing={1}>
      <Grid item xs={12} sx={{fontWeight: 'bold'}}>옵션</Grid>
      <Grid item xs={2}>
        옵션 개수
      </Grid>
      <Grid item xs={10}>
        <OutlinedInput
          fullWidth
          value={fields.length}
          onChange={(e)=> {
            const newValue = Number(e.target.value);
            if(fields.length > newValue) {
              remove(fields.length - 1);
            } else if(fields.length < newValue) {
              append({ value : '' });
            }
          }}
          type="number"
          inputProps={{min: 0, max: 3}}
          endAdornment={<InputAdornment position="end">개</InputAdornment>}
        />
      </Grid>
      {
        fields.length > 0 && (
          <Grid item xs={2}>옵션 입력</Grid>
        )
      }
      <Grid item container spacing={1} xs={10}>
        {fields.map((field, index) => {
          return (
            <Grid item xs={6} key={field.id}>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                {...register(`options.${index}.value` as const)}
              />
            </Grid>
          )
        })}
      </Grid>
    </VerticalCenterGrid>
  );
};