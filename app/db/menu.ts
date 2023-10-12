"use server";
import { Day, MenuItem } from "@/types";
import { prisma } from "./prisma";
import getUser from "./user";
import { Prisma } from "@prisma/client";

export const addRecipeToMenu = async (
  item: Omit<MenuItem, "name">,
): Promise<Omit<MenuItem, "name">> => {
  const { day, portions, id } = item;
  const userId = await getUser();
  const res = await prisma.recipe_ingredient.findMany({
    where: { recipeId: id },
    select: { id: true, name: true, quantity: true, unit: true },
  });
  const ingredients = res.map((item) => ({
    checked: false,
    ...item,
    userId,
  }));
  const data = await prisma.menu.create({
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
  return { day: data.day as Day, id: data.id, portions: data.portions };
};

export const removeMenuItem = async (id: string) => {
  const userId = await getUser();
  const data = await prisma.menu.delete({ where: { id, userId } });
  return data.id;
};

export const changeMenuItemPortions = async (
  item: MenuItem,
): Promise<MenuItem> => {
  const { id, portions } = item;
  const userId = await getUser();
  const { recipe } = await prisma.menu.findUniqueOrThrow({
    where: { id },
    select: { recipe: { select: { portions: true, ingredients: true } } },
  });
  const scale = portions / recipe.portions;
  const rescaled = recipe.ingredients.map((i) => {
    const { recipeId, ...rest } = i;
    return {
      ...rest,
      quantity: Number(rest.quantity) * scale,
      userId,
      checked: false,
    };
  });
  const data = await prisma.menu.update({
    where: { id },
    data: {
      portions,
      shoppingListItem: {
        deleteMany: { menuId: id },
        createMany: {
          data: rescaled.map((i) => ({
            ...i,
            quantity: new Prisma.Decimal(i.quantity.toString()),
          })),
        },
      },
    },
    select: {
      id: true,
      day: true,
      portions: true,
      recipe: { select: { name: true } },
    },
  });
  const {
    recipe: { name },
    day,
    ...rest
  } = data;
  return { ...rest, day: day as Day, name };
};

export const changeMenuItemDay = async ({
  day,
  id,
  name,
  portions,
}: MenuItem): Promise<MenuItem> => {
  const userId = await getUser();
  const data = await prisma.menu.update({
    where: { id, userId },
    data: { day },
    select: {
      day: true,
    },
  });
  return { id, name, portions, day: data.day as Day };
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const userId = await getUser();
  const data = await prisma.menu.findMany({
    where: { userId },
    select: {
      id: true,
      recipeId: true,
      day: true,
      portions: true,
      recipe: { select: { name: true } },
    },
  });
  const item: MenuItem[] = data.map((i) => {
    const {
      recipe: { name },
      day,
      ...rest
    } = i;
    return { ...rest, name, day: day as Day };
  });
  return item;
};
