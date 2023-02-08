import {
  ListItemButton,
  ListItemText,
  ListItemButtonProps,
} from "@mui/material";
import { Category } from "@pages/product/add";

interface CategoryListItemButtonProps extends ListItemButtonProps {
  category: Category;
  seletedCategory: Category | null;
  onClick: () => void;
}

export const CategoryListItemButton = ({
  category,
  seletedCategory,
  onClick,
  ...props
}: CategoryListItemButtonProps) => (
  <ListItemButton
    selected={seletedCategory?.id === category.id}
    onClick={onClick}
    {...props}
  >
    <ListItemText primary={category.title} />
  </ListItemButton>
);
