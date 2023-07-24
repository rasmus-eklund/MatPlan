"use server";
import {
  addIngredient,
  FullRecipe,
  IngredientType,
  Recipe_ingredient,
} from '@/types';
import { prisma } from './db';
import { Prisma, extra_ingredient } from '@prisma/client';
import getUser from './getUser';

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
}: {
  id: string;
  portions: number;
}) => {
  const userId = await getUser();
  console.log({ recipeId: id, userId, portions, day: "monday" });
  await prisma.menu.create({
    data: { recipeId: id, userId, portions, day: 'Måndag' },
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

  return queryRes.flatMap(r => {
    const scale = r.portions / r.recipe.portions;
    return r.recipe.recipe_ingredient.map(i => ({
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

export const getExtraIngredients = async () => {
  const userId = await getUser();
  const data = await prisma.extra_ingredient.findMany({
    where: { userId },
    include: { ingredient: true },
  });
  return data.map(i => ({
    name: i.name,
    quantity: Number(i.quantity),
    unit: i.unit,
    subCategory: i.ingredient.subcategoryId,
    from: 'Egna varor',
  }));
};

export const upsertExtraIngredient = async (ing: addIngredient) => {
  const userId = await getUser();
  const newIng: extra_ingredient = {
    ...ing,
    userId,
    quantity: new Prisma.Decimal(ing.quantity),
  };
  console.log(newIng);
  await prisma.extra_ingredient.upsert({
    where: { name: ing.name, userId },
    update: newIng,
    create: newIng,
  });
};

export const deleteExraIngredient = async (name: string) => {
  const userId = await getUser();
  await prisma.extra_ingredient.delete({ where: { name, userId } });
};

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

export const deleteRecipe = async (id: string) => {
  const userId = await getUser();
  console.log(id, userId);
  await prisma.recipe.delete({ where: { id, userId } });
};

export const getSubcategories = async () =>
  await prisma.subcategory.findMany({ include: { category: true } });

export const getCategories = async () =>
  await prisma.category.findMany({ include: { subcategory: true } });
