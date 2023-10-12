import days from "./app/constants/days";
import units from "./app/constants/units";

export type Day = (typeof days)[number];
export type Unit = (typeof units)[number];

export type Recipe = {
  id: string;
  name: string;
  portions: number;
  instruction: string;
  ingredients: RecipeIngredient[];
  children: RecipeSearch[];
};

export type RecipeIngredient = {
  id: string;
  recipeId: string;
  quantity: number;
  unit: Unit;
  name: string;
};

export type RecipeIngredientFront = {
  quantity: number;
  unit: Unit;
  name: string;
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
  day: Day;
  portions: number;
};

export type ShoppingListItem = {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
  checked: boolean;
  recipe?: string;
  subcategoryId: number;
};

export type ShoppingListItemsGrouped = {
  name: string;
  subcategoryId: number;
  checked: boolean;
  group: ShoppingListItem[];
};

export type StoreOrder = {
  name: string;
  id: string;
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
  id: string;
  quantity: number?;
  unit: Unit?;
};

export type SearchParams = {
  search: string;
  filter: Filter;
};

export type Filter = "name" | "ingredient" | "instruction";

export type ShoppingListFilter = {
  group: boolean;
  hideRecipe: boolean;
  selectedStore: string;
  stores: StoreOrder[];
};

export type OptimisticType<T> = {
  setOpt: (action: T[] | ((pendingState: T[]) => T[])) => void;
  setItems: Dispatch<SetStateAction<T[]>>;
};

export type OptimisticMethod<T> = {
  item: T;
  cb: (item: T) => Promise<T>;
};
