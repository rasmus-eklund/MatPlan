"use server";
import { FullRecipe, IngredientType, Recipe_ingredient } from "@/types";
import { prisma } from "./db";
import getUser from "./user";

export const getRecipeByName = async (search: string) => {
  const userId = await getUser();
  return await prisma.recipe.findMany({
    where: { userId, name: { contains: search, mode: "insensitive" } },
  });
};

export const getRecipeByInstructions = async (search: string) => {
  const userId = await getUser();
  return await prisma.recipe.findMany({
    where: { userId, instruction: { contains: search, mode: "insensitive" } },
  });
};

export const getRecipeByIngredient = async (search: string) => {
  const userId = await getUser();
  return await prisma.recipe.findMany({
    where: {
      userId,
      recipe_ingredient: {
        some: { ingredientName: { contains: search, mode: "insensitive" } },
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
  console.log("changed");
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

export const getShoppingList = async () => {
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

  return queryRes.flatMap((r) => {
    const scale = r.portions / r.recipe.portions;
    return r.recipe.recipe_ingredient.map((i) => ({
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

export const updateRecipe = async (recipe: FullRecipe) => {
  const result = await prisma.recipe.upsert({
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
  return result.id;
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
};

export const deleteIngredient = async (id: string) => {
  await prisma.recipe_ingredient.delete({
    where: { id },
  });
};

export const deleteRecipe = async (id: string) => {
  const userId = await getUser();
  console.log(id, userId);
  await prisma.recipe.delete({ where: { id, userId } });
};

export const getSubcategories = async () =>
  await prisma.subcategory.findMany({ include: { category: true } });

export const getCategories = async () =>
  await prisma.category.findMany({ include: { subcategory: true } });
