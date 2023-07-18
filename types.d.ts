export type Recipe = {
  id: string;
  instruction: string;
  name: string;
  portions: number;
  userId: string;
};

export type Recipe_ingredient = {
  id: string;
  recipeId: string;
  quantity: number;
  unit: string;
  ingredientName: string;
};

export type FullRecipe = {
  id: string;
  instruction: string;
  name: string;
  portions: number;
  userId: string;
  recipe_ingredient: Recipe_ingredient[];
};

export type FilterParams = "name" | "ingredients" | "instruction";
export type SearchRecipeParams = {
  filter: FilterParams;
  search: string;
};
