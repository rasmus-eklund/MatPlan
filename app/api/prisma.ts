import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRecipeByName = async (search: string) =>
  await prisma.recipe.findMany({
    where: { name: { contains: search } },
  });

export const getRecipeByInstructions = async (search: string) =>
  await prisma.recipe.findMany({
    where: { instruction: { contains: search } },
  });

export const getRecipeByIngredient = async (search: string) =>
  await prisma.recipe.findMany({
    where: {
      recipe_ingredient: {
        some: { ingredientName: { contains: search } },
      },
    },
  });

export const getRecipeById = async (id: string) =>
  await prisma.recipe.findUnique({
    where: { id: id },
    include: { recipe_ingredient: true },
  });
