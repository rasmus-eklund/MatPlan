'use server';
import getUser from './user';
import { prisma } from './prisma';
import { StoreOrder, StoreCategory } from '@/types';

const generateDefaultStore = async () =>
  await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      subcategory: { select: { id: true, name: true } },
    },
  });

export const getAllStores = async (): Promise<StoreOrder[]> => {
  const userId = await getUser();
  return await prisma.store.findMany({
    where: { userId },
    select: {
      name: true,
      id: true,
      order: {
        select: {
          category: { select: { name: true, id: true } },
          subcategory: { select: { name: true, id: true } },
        },
      },
    },
  });
};
export const getStoreById = async (id: string): Promise<StoreOrder> => {
  return await prisma.store.findUniqueOrThrow({
    where: { id },
    select: {
      name: true,
      id: true,
      order: {
        select: {
          category: { select: { name: true, id: true } },
          subcategory: { select: { name: true, id: true } },
        },
      },
    },
  });
};

export const addDefaultStore = async () => {
  const userId = await getUser();
  const store = await generateDefaultStore();
  const data: StoreCategory[] = store.flatMap(cat =>
    cat.subcategory.map(sub => ({ categoryId: cat.id, subcategoryId: sub.id }))
  );
  await prisma.store.create({
    data: { name: 'Ny affär', userId, order: { createMany: { data } } },
  });
};

export const removeStore = async (id: string) => {
  const userId = await getUser();
  await prisma.store.delete({ where: { userId, id } });
  const nr = await prisma.store.findMany({ where: { userId } });
  if (nr.length === 0) {
    await addDefaultStore();
  }
};

export const renameStore = async (id: string, name: string) => {
  await prisma.store.update({ where: { id }, data: { name: name } });
};

export const updateStore = async (id: string, data: StoreCategory[]) => {
  await prisma.store_category.deleteMany({ where: { storeId: id } });
  await prisma.store.update({
    where: { id },
    data: {
      order: {
        deleteMany: { storeId: id },
        createMany: { data },
      },
    },
  });
};
