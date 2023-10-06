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
  const test3 = await addRecipe(
    defaultRecipes.find(i => i.name === 'Test3')!,
    []
  );
  const test2 = await addRecipe(
    defaultRecipes.find(i => i.name === 'Test2')!,
    []
  );
  const test1 = await addRecipe(
    defaultRecipes.find(i => i.name === 'Test1')!,
    []
  );
  await addRecipesToContainer(
    [{ id: test2, name: 'Test2', portions: 2 }],
    test1
  );
  await addRecipesToContainer(
    [{ id: test3, name: 'Test3', portions: 2 }],
    test2
  );
};

export default getUser;
