'use server';
import { Day, MenuItem, ShoppingListItem } from '@/types';
import { prisma } from './prisma';
import getUser from './user';
import { Prisma } from '@prisma/client';

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
  const res = await prisma.recipe_ingredient.findMany({
    where: { recipeId: id },
  });
  const ingredients = res.map(({ name, quantity, unit }) => ({
    checked: false,
    name,
    quantity,
    unit,
    userId,
  }));
  await prisma.menu.create({
    data: {
      recipeId: id,
      userId,
      portions,
      day,
      shoppingListItem: {
        createMany: { data: ingredients },
      },
    },
  });
};

export const removeRecipeFromMenu = async (id: string) => {
  const userId = await getUser();
  await prisma.menu.delete({ where: { id, userId } });
};

export const updateMenuPortions = async (id: string, newPortions: number) => {
  const userId = await getUser();
  const { recipe } = await prisma.menu.findUniqueOrThrow({
    where: { id },
    select: { recipe: { select: { portions: true, ingredients: true } } },
  });
  const scale = newPortions / recipe.portions;
  const rescaled = recipe.ingredients.map(i => {
    const { recipeId, ...rest } = i;
    return {
      ...rest,
      quantity: Number(rest.quantity) * scale,
      userId,
      checked: false,
    };
  });
  await prisma.menu.update({
    where: { id },
    data: {
      portions: newPortions,
      shoppingListItem: {
        deleteMany: { menuId: id },
        createMany: {
          data: rescaled.map(i => ({
            ...i,
            quantity: new Prisma.Decimal(i.quantity.toString()),
          })),
        },
      },
    },
  });
};

export const changeRecipeDay = async (recipeId: string, day: Day) => {
  const userId = await getUser();
  await prisma.menu.update({
    where: { id: recipeId, userId },
    data: { day },
  });
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const userId = await getUser();
  const res = await prisma.menu.findMany({
    where: { userId },
    select: {
      id: true,
      recipeId: true,
      day: true,
      portions: true,
      recipe: { select: { name: true } },
    },
  });
  const item: MenuItem[] = res.map(i => ({
    id: i.id,
    day: i.day as Day,
    name: i.recipe.name,
    recipeId: i.recipeId,
    portions: i.portions,
  }));
  return item;
};
