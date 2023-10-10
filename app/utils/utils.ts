import {
  CategoryItem,
  IngredientCat,
  RecipeSearch,
  SearchParams,
  ShoppingListItem,
  Store,
} from '@/types';
import {
  getRecipeByIngredient,
  getRecipeByInstructions,
  getRecipeByName,
} from '../db/recipes';

export const capitalize = (s: string) => {
  return s[0].toUpperCase() + s.slice(1);
};

export const SearchRecipeByFilter = async ({
  filter,
  search,
}: SearchParams) => {
  let data: RecipeSearch[] = [];
  if (filter === 'ingredient') {
    data = await getRecipeByIngredient(search);
  }
  if (filter === 'instruction') {
    data = await getRecipeByInstructions(search);
  }
  if (filter === 'name') {
    data = await getRecipeByName(search);
  }
  return data;
};

export const formatStore = (items: Store): CategoryItem[] => {
  const start: CategoryItem[] = [];
  return items.order.reduce((acc, inputItem) => {
    const foundIndex = acc.findIndex(item => item.id === inputItem.category.id);
    if (foundIndex === -1) {
      acc.push({
        ...inputItem.category,
        subcategories: [{ ...inputItem.subcategory }],
      });
    } else {
      acc[foundIndex].subcategories.push({
        ...inputItem.subcategory,
      });
    }
    return acc;
  }, start);
};

export const sortShoppingList = (
  store: Store,
  items: ShoppingListItem[],
  categories: IngredientCat[]
) => {
  let sortedIngredients = items.sort((a, b) => {
    const aIndex = categories.find(i => i.name === a.name)!.subcategoryId;
    const bIndex = categories.find(i => i.name === b.name)!.subcategoryId;
    return (
      store.order.map(i => i.subcategory.id).indexOf(aIndex) -
      store.order.map(i => i.subcategory.id).indexOf(bIndex)
    );
  });
  return sortedIngredients;
};
