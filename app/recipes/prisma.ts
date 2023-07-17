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
  await prisma.public_recipe_ingredient.findMany({
    where: { ingredientName: { contains: search } },
    include: { public_recipe: { select: { name: true } } },
  });
