'use server';
import {
  ExtraIngredient,
  FullRecipe,
  IngredientType,
  Recipe_ingredient,
} from '@/types';
import { prisma } from './db';
import { Prisma, extra_ingredient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const getUser = async () => {
  const session = await getSession();
  if (session?.user?.email) {
    return session.user.email;
  }
};

export const getRecipeByName = async (search: string) => {
  const userId = await getUser();
  if (userId) {
    await prisma.recipe.findMany({
      where: { userId, name: { contains: search, mode: 'insensitive' } },
    });
  }
  return [];
};

export const getRecipeByInstructions = async (search: string, userId: string) =>
  await prisma.recipe.findMany({
    where: { userId, instruction: { contains: search, mode: 'insensitive' } },
  });

export const getRecipeByIngredient = async (search: string, userId: string) =>
  await prisma.recipe.findMany({
    where: {
      userId,
      recipe_ingredient: {
        some: { ingredientName: { contains: search, mode: 'insensitive' } },
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

export const addRecipeToMenu = async ({
  id,
  userId,
  portions,
}: {
  id: string;
  userId: string;
  portions: number;
}) => {
  await prisma.menu.create({ data: { recipeId: id, userId, portions } });
};

export const removeRecipeFromMenu = async (id: string, userId: string) => {
  await prisma.menu.delete({ where: { recipeId: id, userId } });
};

export const getMenuItems = async (userId: string) =>
  await prisma.menu.findMany({ where: { userId }, include: { recipe: true } });

export const getShoppingList = async (userId: string) => {
  const queryRes = await prisma.menu.findMany({
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
  return queryRes.flatMap(r =>
    r.recipe.recipe_ingredient.map(i => ({
      name: i.ingredientName,
      quantity: i.quantity,
      unit: i.unit,
      subCategory: i.ingredient.subcategoryId,
      id: i.id,
      recipe: r.recipe.name,
    }))
  );
};

export const getStoreOrder = async (userId: string) =>
  await prisma.subcategory.findMany();

export const getIngredients = async (): Promise<IngredientType[]> =>
  await prisma.ingredient.findMany();

export const getExtraIngredients = async () => {
  const userId = await getUser();
  if (userId) {
    const data = await prisma.extra_ingredient.findMany({ where: { userId } });
    return data.map(i => ({ ...i, quantity: Number(i.quantity) }));
  }
  return [];
};

export const upsertExtraIngredient = async (ing: ExtraIngredient) => {
  const userId = await getUser();
  if (userId) {
    console.log('upsert extra ing prisma: ', userId);
    const newIng: extra_ingredient = {
      ...ing,
      userId,
      quantity: new Prisma.Decimal(ing.quantity),
    };
    await prisma.extra_ingredient.upsert({
      where: { name: ing.name, userId },
      update: newIng,
      create: newIng,
    });
  }
};

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
