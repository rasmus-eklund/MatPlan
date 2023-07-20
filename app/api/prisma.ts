"use server";
import { FullRecipe, Recipe_ingredient } from "@/types";
import { prisma } from "./db";

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

export const getStoreOrder = async (userId: string) =>
  await prisma.subcategory.findMany();

export const updateRecipe = async (recipe: FullRecipe) => {
  await prisma.recipe.upsert({
    where: { id: recipe.id },
    update: {
      name: recipe.name,
      portions: recipe.portions,
      instruction: recipe.instruction,
    },
    create: {
      name: recipe.name,
      portions: recipe.portions,
      instruction: recipe.instruction,
      userId: recipe.userId,
    },
  });
};

export const updateIngredient = async (ingredient: Recipe_ingredient) => {
  await prisma.recipe_ingredient.upsert({
    where: { id: ingredient.id },
    update: {
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    },
    create: {
      ingredientName: ingredient.ingredientName,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      recipeId: ingredient.recipeId,
    },
  });
  console.log(ingredient);
};
