'use server';
import { prisma } from './db';

export const getRecipeByName = async (search: string, userId: string) =>
  await prisma.recipe.findMany({
    where: { userId, name: { contains: search } },
  });

export const getRecipeByInstructions = async (search: string, userId: string) =>
  await prisma.recipe.findMany({
    where: { userId, instruction: { contains: search } },
  });

export const getRecipeByIngredient = async (search: string, userId: string) =>
  await prisma.recipe.findMany({
    where: {
      userId,
      recipe_ingredient: {
        some: { ingredientName: { contains: search } },
      },
    },
  });

export const getRecipeById = async (id: string, userId: string) => {
  const data = await prisma.recipe.findUnique({
    where: { id: id, userId },
    include: { recipe_ingredient: true },
  });
  return JSON.stringify(data);
};

export const addRecipeToMenu = async (id: string, userId: string) => {
  await prisma.menu.create({ data: { recipeId: id, userId } });
};

export const removeRecipeFromMenu = async (id: string, userId: string) => {
  await prisma.menu.delete({ where: { recipeId: id, userId } });
};

export const getMenuItems = async (userId: string) =>
  await prisma.menu.findMany({ where: { userId }, include: { recipe: true } });

export const getShoppingList = async (userId: string) =>
  prisma.menu.findMany({
    where: { userId },
    include: {
      recipe: {
        include: {
          recipe_ingredient: {
            include: { ingredient: { include: { subcategory: true } } },
          },
        },
      },
    },
  });
