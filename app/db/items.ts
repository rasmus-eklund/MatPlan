'use server';
import {
  IngredientCat,
  RecipeIngredientFront,
  ShoppingListItem,
} from '@/types';
import { prisma } from './prisma';
import getUser from './user';
import { Prisma } from '@prisma/client';

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

const toShoppingListItem = (item: shoppingListItemResponse) => {
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
  'from' | 'name' | 'subcategoryId'
>): Promise<ShoppingListItem> => {
  const item = await prisma.shoppingListItem.update({
    where: { id },
    data: { checked, quantity, unit },
    select: {
      checked: true,
      id: true,
      name: true,
      quantity: true,
      unit: true,
      recipe: { select: { recipe: { select: { name: true } } } },
      ingredient: { select: { subcategoryId: true } },
    },
  });
  return toShoppingListItem(item);
};

export const createItem = async (
  ing: RecipeIngredientFront
): Promise<ShoppingListItem> => {
  const userId = await getUser();
  const item = await prisma.shoppingListItem.create({
    data: { ...ing, checked: false, userId },
    select: {
      checked: true,
      id: true,
      name: true,
      quantity: true,
      unit: true,
      recipe: { select: { recipe: { select: { name: true } } } },
      ingredient: { select: { subcategoryId: true } },
    },
  });
  return toShoppingListItem(item);
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
    select: {
      checked: true,
      id: true,
      name: true,
      quantity: true,
      unit: true,
      recipe: { select: { recipe: { select: { name: true } } } },
      ingredient: { select: { subcategoryId: true } },
    },
  });
  return items.map(i => toShoppingListItem(i));
};

export const getIngredientCategories = async (): Promise<IngredientCat[]> =>
  await prisma.ingredient.findMany({
    select: { name: true, subcategoryId: true, categoryId: true },
  });
