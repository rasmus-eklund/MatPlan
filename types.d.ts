const days = [
  'Måndag',
  'Tisdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lördag',
  'Söndag',
  'Obestämd',
] as const;

export type Day = (typeof days)[number];

export type Recipe = {
  id: string;
  name: string;
  portions: number;
  instruction: string;
  ingredients: RecipeIngredient[];
};

export type RecipeIngredient = {
  id: string;
  recipeId: string;
  quantity: number;
  unit: string;
  name: string;
};

export type RecipeIngredientFront = {
  quantity: number;
  unit: string;
  name: string;
};

export type RecipeFront = {
  name: string;
  portions: number;
  instruction: string;
  ingredients: RecipeIngredientFront[];
};

export type Recipe_recipe = {
  containerRecipeId: string;
  containedRecipeId: string;
  id: string;
};

export type RecipeSearch = {
  name: string;
  id: string;
  portions: number;
};

export type IngredientCat = {
  name: string;
  categoryId: number;
  subcategoryId: number;
};

export type MenuItem = {
  id: string;
  name: string;
  recipeId: string;
  day: Day;
  portions: number;
};

export type ShoppingListType = {
  id: string;
  name: string;
  quantity: Decimal;
  unit: string;
  subCategory: number;
  from?: string;
};

export type ShoppingListLocalStorage = {
  id: string;
  name: string;
  checked: boolean;
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
  name: string;
};

export type SearchParams = {
  search: string;
  filter: Filter;
};

export type Filter = 'name' | 'ingredient' | 'instruction';
