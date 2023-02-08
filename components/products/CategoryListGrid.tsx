import {
  Autocomplete,
  Grid,
  List,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Category } from "@pages/product/add";
import { useState } from "react";
import styled from "@emotion/styled";
import { Controller, useFormContext } from "react-hook-form";
import { CategoryListItemButton } from "./CategoryListItemButton";

// mock 나 api로 대체해야함
const majorCategoryList: Category[] = Array.from({ length: 2 }, (_, idx) => ({
  id: idx,
  title: `대분류${idx}`,
  childIds: [idx, idx + 2],
}));

const middleCategoryList: Category[] = Array.from({ length: 4 }, (_, idx) => ({
  id: idx,
  title: `중분류${idx}`,
  childIds: [idx, idx + 4, idx + 8, idx + 12],
}));

const subCategoryList: Category[] = Array.from({ length: 16 }, (_, idx) => ({
  id: idx,
  title: `소분류${idx}`,
  childIds: [],
}));

const ScrollableList = styled(List)`
  min-height: 150px;
  max-height: 150px;
  overflow: auto;
  border: 1px solid #6b7280;
`;

export const CategoryListGrid = () => {
  const { watch, control } = useFormContext();

  const [selectedMajorCategory, setSelectedMajorCategory] =
    useState<Category | null>(null);
  const [selectedMiddleCategory, setSelectedMiddleCategory] =
    useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<Category | null>(null);

  const visibleMiddleCategoryList = middleCategoryList.filter(({ id }) =>
    selectedMajorCategory?.childIds.includes(id)
  );
  const visibleSubCategoryList = subCategoryList.filter(({ id }) =>
    selectedMiddleCategory?.childIds.includes(id)
  );
  const isFilter = watch("isCategoryFilterActive");
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ fontWeight: "bold" }}>
        카테고리
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="isCategoryFilterActive"
          control={control}
          render={({ field: { onChange, ...restField } }) => (
            <ToggleButtonGroup
              onChange={(_, data) => {
                console.log(data);
                onChange(data);
              }}
              exclusive
              {...restField}
            >
              <ToggleButton value={false}>카테고리명 검색</ToggleButton>
              <ToggleButton value={true}>카테고리명 선택</ToggleButton>
            </ToggleButtonGroup>
          )}
        />
        {!isFilter ? (
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, ...restField } }) => (
              <Autocomplete
                options={subCategoryList.map(({ title }) => title)}
                renderInput={(params) => <TextField {...params} />}
                onChange={(e, data) => onChange(data)}
                {...restField}
              />
            )}
          />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ScrollableList>
                {majorCategoryList.map((category) => (
                  <CategoryListItemButton
                    category={category}
                    seletedCategory={selectedMajorCategory}
                    onClick={() => setSelectedMajorCategory(category)}
                    key={"major" + category.id}
                  />
                ))}
              </ScrollableList>
            </Grid>
            <Grid item xs={4}>
              <ScrollableList>
                {visibleMiddleCategoryList.map((category) => (
                  <CategoryListItemButton
                    category={category}
                    seletedCategory={selectedMiddleCategory}
                    onClick={() => setSelectedMiddleCategory(category)}
                    key={"middle" + category.id}
                  />
                ))}
              </ScrollableList>
            </Grid>
            <Grid item xs={4}>
              <ScrollableList>
                {visibleSubCategoryList.map((category) => (
                  <Controller
                    name="category"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <CategoryListItemButton
                        category={category}
                        seletedCategory={selectedSubCategory}
                        onClick={() => {
                          onChange(category.title);
                          setSelectedSubCategory(category);
                        }}
                      />
                    )}
                    key={"sub" + category.id}
                  />
                ))}
              </ScrollableList>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
