import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Divider } from "@mui/material";
import { NameGrid } from "@cp/products/NameGrid";
import { CategoryListGrid } from "@cp/products/CategoryListGrid";
import { PriceGrid } from "@cp/products/PriceGrid";
import { StockGrid } from "@cp/products/StockGrid";
import { OptionGrid } from "@cp/products/OptionGrid";
import { ImageGrid } from "@cp/products/ImageGrid";
import { InfoGrid } from "@cp/products/InfoGrid";
import { FC } from "react";
import { noop } from "lodash";

const StyledDivider = () => <Divider sx={{ m: 1 }} />;

const defaultValues = {
  productName: "", // 상품명
  category: "", // 카테고리
  isCategoryFilterActive: false, // 카테고리 필터 활성화 여부
  price: 0, // 판매가
  discount: {
    isActive: false, // 활성화 여부
    value: {
      price: 0, // 할인가
      type: "all", // 할인 타입
    },
  },
  dateRange: {
    isActive: false, // 활성화 여부
    value: {
      startDate: null, // 판매시작일
      endDate: null, // 판매종료일
    },
  },
  texType: "taxable", // 부가세
  stock: 0, // 재고수량
  options: [], // 옵션
  majorImage: {}, // 대표 이미지
  minorImages: {}, // 추가 이미지
  info: "", // 상품 상세 설명
};

interface AddFormProps {
  handleSubmit?: (data: any) => void;
}

export const AddForm: FC<AddFormProps> = ({ handleSubmit = noop }) => {
  const methods = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => handleSubmit(data);

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
        <Button color="primary" size="large" type="submit" variant="contained">
          저장
        </Button>
      </form>
    </FormProvider>
  );
};
