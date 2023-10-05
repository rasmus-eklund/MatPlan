'use server';
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';
import { prisma } from './prisma';
import defaultRecipes from './constants/recipes/recieps';
import * as store from './stores';
import { addRecipesToContainer, addRecipe } from './recipes';

const getUser = async () => {
  const session = await getServerSession(options);
  if (!session?.user?.email) {
    throw new Error('No user');
  }
  return session.user.email;
};

export const checkNewUser = async () => {
  const userId = await getUser();
  const users = await prisma.user.findUnique({ where: { id: userId } });
  if (users === null) {
    await prisma.user.create({ data: { id: userId } });
    await store.addDefault(userId);
    await createDefaultRecipes();
  }
};

export const createDefaultRecipes = async () => {
  const userId = await getUser();
  const test3 = await addRecipe(
    defaultRecipes.find(i => i.name === 'Test3')!,
    userId
  );
  const test2 = await addRecipe(
    defaultRecipes.find(i => i.name === 'Test2')!,
    userId
  );
  const test1 = await addRecipe(
    defaultRecipes.find(i => i.name === 'Test1')!,
    userId
  );
  await addRecipesToContainer(test2, test1);
  await addRecipesToContainer(test3, test2);
};

export default getUser;
