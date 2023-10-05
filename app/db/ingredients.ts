'use server';
import {
  RecipeIngredient,
  IngredientCat,
  RecipeIngredientFront,
} from '@/types';
import { prisma } from './prisma';
import getUser from './user';

export const updateIngredient = async ({
  id,
  quantity,
  unit,
}: RecipeIngredient) => {
  await prisma.recipe_ingredient.update({
    where: { id },
    data: { quantity, unit },
  });
};

export const createIngredient = async (
  recipeId: string,
  ingredient: RecipeIngredientFront
): Promise<RecipeIngredient> => {
  const ing = await prisma.recipe_ingredient.create({
    data: { ...ingredient, recipeId },
  });
  return { ...ing, quantity: Number(ing.quantity) };
};

export const deleteIngredient = async (id: string) => {
  await prisma.recipe_ingredient.delete({
    where: { id },
  });
};

export const getRecipeIngredients = async () => {
  const userId = await getUser();
  const queryRes = await prisma.menu.findMany({
    where: { userId },
    include: {
      recipe: {
        include: {
          ingredients: {
            include: { ingredient: true },
          },
        },
      },
    },
  });

  return queryRes.flatMap(r => {
    const scale = r.portions / r.recipe.portions;
    return r.recipe.ingredients.map(i => ({
      id: i.id,
      name: i.name,
      quantity: Number(i.quantity) * scale,
      unit: i.unit,
      subCategory: i.ingredient.subcategoryId,
      from: r.recipe.name,
    }));
  });
};

export const getIngredients = async (): Promise<IngredientCat[]> =>
  await prisma.ingredient.findMany();
