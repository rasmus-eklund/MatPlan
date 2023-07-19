'use server';
import { prisma } from './db';

export const getMenuItems = async (userId: string) => {
    const returned = await prisma.menu.findMany({ where: { userId } });
    console.log('something before the returned also')
    console.log(returned);
  return returned;
};
