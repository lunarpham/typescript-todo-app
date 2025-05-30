import { Category } from "src/types/todoTypes";

export const getCategoryOptions = () => {
  return Object.values(Category).map((category) => ({
    value: category,
    label: getCategoryDisplayName(category),
  }));
};

export const getCategoryDisplayName = (category: Category): string => {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};
