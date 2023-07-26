'use server'
import { Home } from '@/types';
import { prisma } from './db';
import getUser from './user';

export const removeHome = async (name: string) => {
  const userId = await getUser();
  await prisma.home.delete({ where: { id: userId, ingredientName: name } });
};

export const addHome = async (name: string) => {
  const userId = await getUser();
  await prisma.home.create({ data: { ingredientName: name, userId } });
};

export const getHome = async (): Promise<Home[]> => {
  const userId = await getUser();
  const home = await prisma.home.findMany({ where: { userId } });
  return home;
};
