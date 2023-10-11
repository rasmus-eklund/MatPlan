'use server';
import { Home } from '@/types';
import { prisma } from './prisma';
import getUser from './user';

export const editHome = async (item: Home, add: boolean) => {
  const userId = await getUser();
  if (add) {
    await prisma.home.create({ data: { userId, ...item } });
  } else {
    await prisma.home.delete({ where: { userId, name: item.name } });
  }
};

export const getHome = async (): Promise<Home[]> => {
  const userId = await getUser();
  const home = await prisma.home.findMany({
    where: { userId },
    select: { name: true, quantity: true, unit: true },
  });
  return home.map(({ name, unit, quantity }) => ({
    name,
    unit,
    quantity: quantity ? Number(quantity) : null,
  }));
};
