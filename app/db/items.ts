"use server";
import { Home, IngredientCat, ShoppingListItem, Unit } from "@/types";
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
    unit,
    quantity,
    ...rest
  } = item;
  return {
    ...rest,
    unit: unit as Unit,
    quantity: Number(quantity),
    recipe: recipe?.recipe.name,
    subcategoryId,
  };
};

const toHomeItem = ({
  name,
  quantity,
  unit,
}: {
  name: string;
  quantity: Prisma.Decimal | null;
  unit: string | null;
}): Home => ({
  id: name,
  quantity: quantity ? Number(quantity) : null,
  unit: unit as Unit,
});

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

export const deleteItem = async ({ id }: ShoppingListItem) => {
  const data = await prisma.shoppingListItem.delete({
    where: { id },
    select,
  });
  return toShoppingListItem(data);
};

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
  const userId = await getUser();
  const data = await prisma.home.create({
    data: { name: item.id, userId },
    select: { name: true, quantity: true, unit: true },
  });
  return toHomeItem(data);
};

export const removeHome = async ({ id }: Home): Promise<Home> => {
  const userId = await getUser();
  const data = await prisma.home.delete({
    where: { userId, name: id },
    select: { name: true, quantity: true, unit: true },
  });
  return toHomeItem(data);
};

export const getHome = async (): Promise<Home[]> => {
  const userId = await getUser();
  const datas = await prisma.home.findMany({
    where: { userId },
    select: { name: true, quantity: true, unit: true },
  });
  return datas.map((data) => toHomeItem(data));
};
