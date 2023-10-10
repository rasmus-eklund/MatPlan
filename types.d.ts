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

export type ShoppingListItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  from: string;
};

export type Store = {
  name: string;
  order: {
    category: {
      name: string;
      id: number;
    };
    subcategory: {
      name: string;
      id: number;
    };
  }[];
};

export type StoreCategory = {
  categoryId: number;
  subcategoryId: number;
};

export type CategoryItem = {
  name: string;
  id: number;
  subcategories: { name: string; id: number }[];
};

export type Home = {
  name: string;
  quantity: number?;
  unit: string?;
};

export type SearchParams = {
  search: string;
  filter: Filter;
};

export type Filter = 'name' | 'ingredient' | 'instruction';

export type ShoppingListFilter = {
  group: boolean;
  hideRecipe: boolean;
};
