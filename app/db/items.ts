'use server';
import {
  IngredientCat,
  RecipeIngredientFront,
  ShoppingListItem,
} from '@/types';
import { prisma } from './prisma';
import getUser from './user';

export const updateItem = async ({
  checked,
  id,
  quantity,
  unit,
}: Omit<ShoppingListItem, 'from' | 'name'>) => {
  await prisma.shoppingListItem.update({
    where: { id },
    data: { checked, quantity, unit },
  });
};

export const createItem = async (
  ing: RecipeIngredientFront
): Promise<ShoppingListItem> => {
  const userId = await getUser();
  const item = await prisma.shoppingListItem.create({
    data: { ...ing, checked: false, userId },
  });
  return { ...item, quantity: Number(item.quantity), from: 'extraItem' };
};

export const deleteItem = async (id: string) => {
  await prisma.shoppingListItem.delete({
    where: { id },
  });
};

export const getShoppingList = async (): Promise<ShoppingListItem[]> => {
  const userId = await getUser();
  const res = await prisma.shoppingListItem.findMany({
    where: { userId },
    include: { recipe: { select: { recipe: { select: { name: true } } } } },
  });
  const items: ShoppingListItem[] = res.map(i => ({
    ...i,
    quantity: Number(i.quantity),
    from: i.recipe ? i.recipe.recipe.name : 'extraItem',
  }));
  return items;
};

export const getIngredientCategories = async (): Promise<IngredientCat[]> =>
  await prisma.ingredient.findMany({
    select: { name: true, subcategoryId: true, categoryId: true },
  });
