"use server";
import { Home, IngredientCat, ShoppingListItem } from "@/types";
import { prisma } from "./prisma";
import getUser from "./user";
import { Prisma } from "@prisma/client";

type shoppingListItemResponse = {
  checked: boolean;
  id: string;
  name: string;
  quantity: Prisma.Decimal;
  unit: string;
  recipe: {
    recipe: {
      name: string;
    };
  } | null;
  ingredient: {
    subcategoryId: number;
  };
};

const select = {
  checked: true,
  id: true,
  name: true,
  quantity: true,
  unit: true,
  recipe: { select: { recipe: { select: { name: true } } } },
  ingredient: { select: { subcategoryId: true, home: true } },
};

const toShoppingListItem = (
  item: shoppingListItemResponse,
): ShoppingListItem => {
  const {
    ingredient: { subcategoryId },
    recipe,
    ...rest
  } = item;
  return {
    ...rest,
    quantity: Number(item.quantity),
    recipe: recipe?.recipe.name,
    subcategoryId,
  };
};

export const updateItem = async ({
  checked,
  id,
  quantity,
  unit,
}: Omit<
  ShoppingListItem,
  "from" | "name" | "subcategoryId"
>): Promise<ShoppingListItem> => {
  const item = await prisma.shoppingListItem.update({
    where: { id },
    data: { checked, quantity, unit },
    select,
  });
  return toShoppingListItem(item);
};

export const createItem = async (
  item: ShoppingListItem,
): Promise<ShoppingListItem> => {
  const userId = await getUser();
  const data = await prisma.shoppingListItem.create({
    data: {
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      checked: false,
      userId,
    },
    select,
  });
  return toShoppingListItem(data);
};

export const deleteItem = async (id: string) =>
  (
    await prisma.shoppingListItem.delete({
      where: { id },
      select: { id: true },
    })
  ).id;

export const getShoppingList = async (): Promise<ShoppingListItem[]> => {
  const userId = await getUser();
  const items = await prisma.shoppingListItem.findMany({
    where: { userId },
    select,
  });
  return items.map((i) => toShoppingListItem(i));
};

export const getIngredientCategories = async (): Promise<IngredientCat[]> =>
  await prisma.ingredient.findMany({
    select: { name: true, subcategoryId: true, categoryId: true },
  });

export const addHome = async (item: Home): Promise<Home> => {
  console.log(item);
  const userId = await getUser();
  const { name, quantity, unit } = await prisma.home.create({
    data: { name: item.id, userId },
    select: { name: true, quantity: true, unit: true },
  });
  return { id: name, quantity: quantity ? Number(quantity) : null, unit };
};

export const removeHome = async (id: string): Promise<string> => {
  const userId = await getUser();
  const data = await prisma.home.delete({
    where: { userId, name: id },
    select: { name: true },
  });
  return data.name;
};

export const getHome = async (): Promise<Home[]> => {
  const userId = await getUser();
  const data = await prisma.home.findMany({
    where: { userId },
    select: { name: true, quantity: true, unit: true },
  });
  return data.map(({ name, quantity, unit }) => ({
    id: name,
    quantity: quantity ? Number(quantity) : null,
    unit,
  }));
};
