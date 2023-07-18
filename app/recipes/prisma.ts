import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRecipeByName = async (search: string) =>
  await prisma.public_recipe.findMany({
    where: { name: { contains: search } },
  });

export const getRecipeByInstructions = async (search: string) =>
  await prisma.public_recipe.findMany({
    where: { instruction: { contains: search } },
  });

export const getRecipeByIngredient = async (search: string) =>
  await prisma.public_recipe.findMany({
    where: {
      public_recipe_ingredient: {
        some: { ingredientName: { contains: search } },
      },
    },
  });

export const getRecipeById = async (id: string) =>
  await prisma.public_recipe.findUnique({
    where: { id: id },
    include: { public_recipe_ingredient: true },
  });
