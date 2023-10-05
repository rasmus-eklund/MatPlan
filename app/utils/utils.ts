import { RecipeSearch, SearchParams } from '@/types';
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

export const SearchRecipeByFilter = async ({ filter, search }: SearchParams) => {
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
