import VerticalCenterGrid from "@cp/common/VerticalCenterGrid";
import { Grid } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

const DynamicEditor = dynamic(() => import("@cp/common/BaseEditor"), { ssr: false });

export const InfoGrid = () => {
  const { control } = useFormContext();

  return (
    <VerticalCenterGrid container spacing={1}>
      <Grid item xs={2} sx={{ fontWeight: 'bold' }}>상품 상세 설명</Grid>
      <Grid item xs={10}>
        <Controller
          name="info"
          control={control}
          render={({
            field: { onChange }
          }) => {
            return (
            <DynamicEditor
              onChange={onChange}
            />
          )}}
        />
      </Grid>
    </VerticalCenterGrid>
  );
};