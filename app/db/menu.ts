'use server';
import { Day, MenuItem } from '@/types';
import { prisma } from './prisma';
import getUser from './user';

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

export const updateMenuPortions = async (id: string, portions: number) => {
  const userId = await getUser();
  await prisma.menu.update({
    where: { userId, id },
    data: { portions },
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
