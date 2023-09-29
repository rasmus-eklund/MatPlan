'use server';
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';
import { prisma } from './prisma';
import { Ingredient, RecipeNoId } from '@/types';
import defaultRecipes from './constants/recipes/recieps';
import { createDefaultStore } from './stores';

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
    await createDefaultStore(userId);
    await createDefaultRecipes(userId);
  }
};

const createDefaultRecipes = async (userId: string) => {
  for (const recipe of defaultRecipes) {
    await addRecipe(recipe, userId);
  }
};

const addRecipe = async (
  { name, portions, instruction, ingredients }: RecipeNoId,
  userId: string
) => {
  const newRecipe = await prisma.recipe.create({
    data: { name, portions, instruction, userId },
  });
  await addRecipeIngredient(ingredients, newRecipe.id);
};

const addRecipeIngredient = async (
  ingredients: Ingredient[],
  recipeId: string
) => {
  const newIngs = ingredients.map(({ quantity, unit, name }) => ({
    ingredientName: name,
    recipeId,
    quantity,
    unit,
  }));
  await prisma.recipe_ingredient.createMany({ data: newIngs });
};

export default getUser;
