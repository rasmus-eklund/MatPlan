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

export function randomizeLetters(
  target: HTMLHeadingElement,
  intervalTime: number = 40
): void {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let interval: NodeJS.Timeout | null = null;
  let iteration = 0;

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    target.innerText = target.innerText
      .split('')
      .map((letter, index) => {
        if (index < iteration) {
          return target.dataset.value?.[index] ?? letter;
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join('');

    if (iteration >= (target.dataset.value?.length ?? 0)) {
      if (interval) {
        clearInterval(interval);
      }
    }

    iteration += 1 / 3;
  }, intervalTime);
}

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
