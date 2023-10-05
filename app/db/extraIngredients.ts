'use server';
import { RecipeIngredient } from '@/types';
import { prisma } from './prisma';
import getUser from './user';
import { Prisma } from '@prisma/client';

export const getExtraIngredients = async () => {
  const userId = await getUser();
  const data = await prisma.extra_ingredient.findMany({
    where: { userId },
    include: { ingredient: true },
  });
  return data.map(i => ({
    id: i.id,
    name: i.name,
    quantity: Number(i.quantity),
    unit: i.unit,
    subCategory: i.ingredient.subcategoryId,
    from: 'Egna varor',
  }));
};

export const updateExtraIngredient = async (
  id: string,
  ing: RecipeIngredient
) => {
  const userId = await getUser();
  await prisma.extra_ingredient.update({
    where: { id, userId },
    data: { ...ing, quantity: new Prisma.Decimal(ing.quantity) },
  });
};

export const createExtraIngredient = async (ing: RecipeIngredient) => {
  const userId = await getUser();
  const newIng = {
    ...ing,
    quantity: new Prisma.Decimal(ing.quantity),
    userId,
    checked: false,
  };
  await prisma.extra_ingredient.create({
    data: newIng,
  });
};

export const deleteExraIngredient = async (id: string) => {
  const userId = await getUser();
  await prisma.extra_ingredient.delete({ where: { id, userId } });
};
