'use server';
import { Store, StoreCategory, SubcategoryItem } from '@/types';
import getUser from './getUser';
import { prisma } from './db';

export const get = async (id: string): Promise<StoreCategory> => {
  const userId = await getUser();
  const subCats = await prisma.subcategory.findMany({
    include: { category: true },
  });
  const store = (await prisma.store.findUnique({
    where: { id, userId },
  })) as Store;
  return {
    ...store,
    order: store.order.map((i): SubcategoryItem => {
      const res = subCats.find(sc => sc.id === i)!;
      return { id: res.id, category: res.category.name, name: res.name };
    }),
  };
};

export const getAll = async () => {
  const userId = await getUser();
  return (await prisma.store.findMany({ where: { userId } })) as Store[];
};

export const upsert = async (store: Store) => {
  const userId = await getUser();
  await prisma.store.upsert({
    where: { id: store.id },
    update: { ...store, userId },
    create: { ...store, userId },
  });
};

export const addDefault = async (name: string) => {
  const userId = await getUser();
  const cats = await prisma.subcategory.findMany();
  const store = cats.map(i => i.id);
  await prisma.store.create({
    data: { name, userId, order: store },
  });
};

export const remove = async (id: string) => {
  const userId = await getUser();
  await prisma.store.delete({ where: { userId, id } });
};
