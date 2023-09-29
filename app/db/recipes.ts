'use server'
import { FullRecipe, Recipe } from "@/types";
import { prisma } from "./prisma";
import getUser from "./user";

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

export const deleteRecipe = async (id: string) => {
  const userId = await getUser();
  await prisma.recipe.delete({ where: { id, userId } });
};
