'use server';
import { CategoryItem, Store, StorePrisma, SubcategoryItem } from '@/types';
import getUser from './user';
import { prisma } from './db';

export const get = async (id: string): Promise<Store> => {
  const userId = await getUser();
  const subCats = await prisma.subcategory.findMany({
    include: { category: true },
  });
  const store = (await prisma.store.findUnique({
    where: { id, userId },
  })) as StorePrisma;

  const theMap = store.order.map(i => {
    const match = subCats.find(sc => sc.id === i)!;
    return {
      subCatId: match.id,
      subCatName: match.name,
      catName: match.category.name,
    };
  });
  const initial: CategoryItem[] = [];
  theMap.forEach(i => {
    const subcat: SubcategoryItem = {
      category: i.catName,
      subcategory: i.subCatName,
      id: i.subCatId,
    };
    const indexOfCat = initial.findIndex(
      (item: CategoryItem) => i.catName === item.category
    );
    if (indexOfCat !== -1) {
      initial[indexOfCat].order.push(subcat);
    } else {
      initial.push({ category: i.catName, order: [subcat] });
    }
  });
  const out: Store = { name: store.name, id: store.id, categories: initial };
  return out;
};

export const getAll = async (): Promise<StorePrisma[]> => {
  const userId = await getUser();
  const stores = await prisma.store.findMany({
    where: { userId },
  });
  return stores;
};

export const upsert = async (store: StorePrisma) => {
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
  const nr = await prisma.store.findMany({ where: { userId } });
  if (nr.length === 0) {
    await createDefaultStore(userId);
  }
};

export const createDefaultStore = async (userId: string) => {
  const cats = await prisma.subcategory.findMany();
  const store = cats.map(i => i.id);
  await prisma.store.create({
    data: { name: 'Ny affär', userId, order: store },
  });
};
