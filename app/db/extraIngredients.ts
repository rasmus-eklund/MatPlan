'use server';
import { Ingredient } from '@/types';
import { prisma } from './db';
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

export const updateExtraIngredient = async (id: string, ing: Ingredient) => {
  const userId = await getUser();
  await prisma.extra_ingredient.update({
    where: { id, userId },
    data: { ...ing, quantity: new Prisma.Decimal(ing.quantity) },
  });
};

export const createExtraIngredient = async (ing: Ingredient) => {
  const userId = await getUser();
  const newIng = {
    id: crypto.randomUUID(),
    ...ing,
    quantity: new Prisma.Decimal(ing.quantity),
    userId,
  };
  console.log(newIng);
  await prisma.extra_ingredient.create({
    data: newIng,
  });
};

export const deleteExraIngredient = async (id: string) => {
  const userId = await getUser();
  await prisma.extra_ingredient.delete({ where: { id, userId } });
};
