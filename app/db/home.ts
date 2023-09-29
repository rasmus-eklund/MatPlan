'use server'
import { Home } from '@/types';
import { prisma } from './prisma';
import getUser from './user';

export const removeHome = async (name: string) => {
  const userId = await getUser();
  await prisma.home.delete({ where: { userId, ingredientName: name } });
};

export const addHome = async (name: string) => {
  const userId = await getUser();
  await prisma.home.create({ data: { userId, ingredientName: name } });
};

export const getHome = async (): Promise<Home[]> => {
  const userId = await getUser();
  const home = await prisma.home.findMany({ where: { userId } });
  return home.map(({ingredientName}) => ({ingredientName}));
};
