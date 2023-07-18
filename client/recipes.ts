import { Recipe } from '@/types';
import { SearchRecipeParams } from '@/types';

export const searchRecipes = async ({ search, filter }: SearchRecipeParams) => {
  const res = await fetch(
    `http://localhost:3000/api/recipes?q=${search}&filter=${filter}`
  );

  const data: Recipe[] = await res.json();
  return data;
};
