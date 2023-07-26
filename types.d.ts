export type Recipe = {
  id: string;
  instruction: string;
  name: string;
  portions: number;
  userId: string;
};

export type RecipeNoId = {
  name: string;
  portions: number;
  ingredients: Ingredient[];
  instruction: string;
};

export type FullRecipe = {
  id: string;
  instruction: string;
  name: string;
  portions: number;
  recipe_ingredient: Recipe_ingredient[];
};

export type FilterParams = 'name' | 'ingredients' | 'instruction';

export type SearchRecipeParams = {
  filter: FilterParams;
  search: string;
};

export type MenuItem = {
  id: string;
  recipe: Recipe;
  recipeId: string;
  userId: string;
  day: string;
  portions: number;
};

export type ShoppingListType = {
  name: string;
  quantity: Decimal;
  unit: string;
  subCategory: number;
  from?: string;
};

export type IngredientType = {
  name: string;
  categoryId: number;
  subcategoryId: number;
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};
export type IngredientId = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  from: string;
};

export type Recipe_ingredient = {
  id: string;
  recipeId: string;
  quantity: number;
  unit: string;
  ingredientName: string;
};

export type StorePrisma = {
  id: string;
  name: string;
  order: number[];
};

export type SubcategoryItem = {
  id: number;
  subcategory: string;
  category: string;
};

export type CategoryItem = {
  category: string;
  order: SubcategoryItem[];
};

export type Store = {
  id: string;
  name: string;
  categories: CategoryItem[];
};

export type Home = {
  id: string;
  ingredientName: string;
};
