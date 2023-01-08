import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Divider } from "@mui/material";
import { NameGrid } from "@cp/products/NameGrid";
import { CategoryListGrid } from "@cp/products/CategoryListGrid";
import { PriceGrid } from './../../components/products/PriceGrid';
import { StockGrid } from "@cp/products/StockGrid";
import { OptionGrid } from "./OptionGrid";
import { ImageGrid } from './ImageGrid';
import { InfoGrid } from './InfoGrid';

const StyledDivider = () => <Divider sx={{m:1}} />;

export const AddForm = () => {
  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box>
          <NameGrid />
        </Box>
        <StyledDivider />
         <Box>
          <CategoryListGrid />
        </Box>
        <StyledDivider />
        <Box>
          <PriceGrid />
        </Box>
        <StyledDivider />
        <Box>
          <StockGrid />
        </Box>
        <StyledDivider />
        <Box>
          <OptionGrid />
        </Box>
        <StyledDivider />
        <Box>
          <ImageGrid />
        </Box>
        <StyledDivider />
        <Box>
          <InfoGrid />
        </Box>
        <Button
          color="error"
          size="large"
          type="reset"
          variant="contained"
          onClick={() => methods.reset()}
        >
          취소
        </Button>
        <Button
          color="primary"
          size="large"
          type="submit"
          variant="contained"
        >
          저장
        </Button>
      </form>
    </FormProvider>
  );
};