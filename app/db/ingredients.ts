'use server'
import { Ingredient, IngredientType, Recipe_ingredient } from '@/types';
import { prisma } from './prisma';
import getUser from './user';

export const updateIngredient = async ({
  id,
  quantity,
  unit,
}: Recipe_ingredient) => {
  await prisma.recipe_ingredient.update({
    where: { id },
    data: { quantity, unit },
  });
};

export const createIngredient = async (
  recipeId: string,
  ingredient: Ingredient
): Promise<Recipe_ingredient> => {
  const ing = await prisma.recipe_ingredient.create({
    data: {
      ingredientName: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      recipeId,
    },
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
          recipe_ingredient: {
            include: { ingredient: true },
          },
        },
      },
    },
  });

  return queryRes.flatMap(r => {
    const scale = r.portions / r.recipe.portions;
    return r.recipe.recipe_ingredient.map(i => ({
      id: i.id,
      name: i.ingredientName,
      quantity: Number(i.quantity) * scale,
      unit: i.unit,
      subCategory: i.ingredient.subcategoryId,
      from: r.recipe.name,
    }));
  });
};

export const getIngredients = async (): Promise<IngredientType[]> =>
  await prisma.ingredient.findMany();
