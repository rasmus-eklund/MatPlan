export type Recipe = {
  id: string;
  instruction: string;
  name: string;
  portions: number;
  userId: string;
};

export type FilterParams = "name" | "ingredients" | "instruction";
export type SearchRecipeParams = {
  filter: FilterParams;
  search: string;
};
