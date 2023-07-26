'use server';
import {
  FullRecipe,
  Ingredient,
  IngredientType,
  Recipe,
  Recipe_ingredient,
} from '@/types';
import { prisma } from './db';
import getUser from './user';

export const getRecipeByName = async (search: string): Promise<Recipe[]> => {
  const userId = await getUser();
  return await prisma.recipe.findMany({
    where: { userId, name: { contains: search, mode: 'insensitive' } },
  });
};

export const getRecipeByInstructions = async (
  search: string
): Promise<Recipe[]> => {
  const userId = await getUser();
  return await prisma.recipe.findMany({
    where: { userId, instruction: { contains: search, mode: 'insensitive' } },
  });
};

export const getRecipeByIngredient = async (
  search: string
): Promise<Recipe[]> => {
  const userId = await getUser();
  return await prisma.recipe.findMany({
    where: {
      userId,
      recipe_ingredient: {
        some: { ingredientName: { contains: search, mode: 'insensitive' } },
      },
    },
  });
};

export const getRecipeById = async (id: string) => {
  const userId = await getUser();
  const data = await prisma.recipe.findUnique({
    where: { id: id, userId },
    include: { recipe_ingredient: true },
  });
  return JSON.stringify(data);
};

export const updateRecipe = async (recipe: FullRecipe) => {
  const userId = await getUser();
  await prisma.recipe.update({
    where: { id: recipe.id, userId },
    data: {
      name: recipe.name,
      portions: recipe.portions,
      instruction: recipe.instruction,
    },
  });
};

export const createNewRecipe = async () => {
  const userId = await getUser();
  const result = await prisma.recipe.create({
    data: {
      userId,
      name: 'Nytt recept',
      portions: 2,
      instruction: 'Lägg till instruktion...',
    },
  });
  return result.id;
};

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

export const deleteRecipe = async (id: string) => {
  const userId = await getUser();
  await prisma.recipe.delete({ where: { id, userId } });
};

export const addRecipeToMenu = async ({
  id,
  portions,
  day,
}: {
  id: string;
  portions: number;
  day: string;
}) => {
  const userId = await getUser();
  await prisma.menu.create({
    data: { recipeId: id, userId, portions, day },
  });
};

export const removeRecipeFromMenu = async (id: string) => {
  const userId = await getUser();
  await prisma.menu.delete({ where: { id, userId } });
};

export const updateMenuPortions = async (
  recipeId: string,
  portions: number
) => {
  const userId = await getUser();
  await prisma.menu.update({
    where: { userId, id: recipeId },
    data: { portions },
  });
};

export const changeRecipeDay = async (recipeId: string, day: string) => {
  const userId = await getUser();
  await prisma.menu.update({
    where: { id: recipeId, userId },
    data: { day },
  });
};

export const getMenuItems = async () => {
  const userId = await getUser();
  return await prisma.menu.findMany({
    where: { userId },
    include: { recipe: true },
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

export const getSubcategories = async () =>
  await prisma.subcategory.findMany({ include: { category: true } });

export const getCategories = async () =>
  await prisma.category.findMany({ include: { subcategory: true } });
