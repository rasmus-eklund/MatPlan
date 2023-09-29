'use server';
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



// export const getSubcategories = async () =>
//   await prisma.subcategory.findMany({ include: { category: true } });

// export const getCategories = async () =>
//   await prisma.category.findMany({ include: { subcategory: true } });
