import { ListItemButton, ListItemText } from "@mui/material";
import { Category } from "@pages/product/add";

interface CategoryListItemButtonProps {
  category: Category,
  seletedCategory: Category | null,
  onClick: () => void,
}


export const CategoryListItemButton = ({
  category,
  seletedCategory,
  onClick,
}: CategoryListItemButtonProps) => (
  <ListItemButton
    selected={seletedCategory?.id === category.id}
    onClick={onClick}
  >
    <ListItemText primary={category.title} />
  </ListItemButton>
)
