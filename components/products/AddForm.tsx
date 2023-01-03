import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Divider } from "@mui/material";
import { NameGrid } from "@cp/products/NameGrid";
import { CategoryListGrid } from "@cp/products/CategoryListGrid";
import { PriceGrid } from './../../components/products/PriceGrid';
import { StockGrid } from "@cp/products/StockGrid";

export const AddForm = () => {
  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box>
          <NameGrid />
        </Box>
        <Divider />
         <Box>
          <CategoryListGrid />
        </Box>
        <Divider />
        <Box>
          <PriceGrid />
        </Box>
        <Divider />
        <Box>
          <StockGrid />
        </Box>
        <Divider />
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