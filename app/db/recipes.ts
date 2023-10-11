'use server';
import { Recipe, RecipeFront, RecipeSearch, SearchParams } from '@/types';
import { prisma } from './prisma';
import getUser from './user';

export const getRecipeByName = async (
  search: string
): Promise<RecipeSearch[]> => {
  const userId = await getUser();
  const res = await prisma.recipe.findMany({
    where: { userId, name: { contains: search, mode: 'insensitive' } },
    select: { name: true, id: true, portions: true },
  });
  return res;
};

export const getRecipeByInstructions = async (
  search: string
): Promise<RecipeSearch[]> => {
  const userId = await getUser();
  return await prisma.recipe.findMany({
    where: { userId, instruction: { contains: search, mode: 'insensitive' } },
    select: { name: true, id: true, portions: true },
  });
};

export const getRecipeByIngredient = async (
  search: string
): Promise<RecipeSearch[]> => {
  const userId = await getUser();
  return await prisma.recipe.findMany({
    where: {
      userId,
      ingredients: {
        some: { name: { contains: search, mode: 'insensitive' } },
      },
    },
    select: { name: true, id: true, portions: true },
  });
};

export const SearchRecipeByFilter = async ({
  filter,
  search,
}: SearchParams) => {
  let data: RecipeSearch[] = [];
  if (filter === 'ingredient') {
    data = await getRecipeByIngredient(search);
  }
  if (filter === 'instruction') {
    data = await getRecipeByInstructions(search);
  }
  if (filter === 'name') {
    data = await getRecipeByName(search);
  }
  return data;
};

export const getRecipeById = async (id: string): Promise<RecipeFront> => {
  const userId = await getUser();
  const data = await prisma.recipe.findUniqueOrThrow({
    where: { id: id, userId },
    select: {
      id: true,
      name: true,
      portions: true,
      instruction: true,
      ingredients: true,
    },
  });
  const recipe: Recipe = {
    ...data,
    portions: Number(data.portions),
    ingredients: data.ingredients.map(i => ({
      ...i,
      quantity: Number(i.quantity),
    })),
  };
  return recipe;
};

export const updateRecipe = async (
  recipe: RecipeFront,
  recipes: RecipeSearch[],
  id: string
) => {
  const updatedRecipe = await prisma.recipe.update({
    where: { id },
    data: {
      name: recipe.name,
      portions: recipe.portions,
      instruction: recipe.instruction,
      ingredients: {
        deleteMany: { recipeId: id },
      },
      containers: { deleteMany: { containerRecipeId: id } },
    },
  });
  await prisma.recipe_ingredient.createMany({
    data: recipe.ingredients.map(i => ({ ...i, recipeId: id })),
  });
  await addRecipesToContainer(recipes, id);
  return updatedRecipe.id;
};

export const deleteRecipe = async (id: string) => {
  const userId = await getUser();
  await prisma.recipe.delete({ where: { id, userId } });
};

export const addRecipe = async (
  recipe: RecipeFront,
  recipes: RecipeSearch[]
) => {
  const userId = await getUser();
  const { name, instruction, portions, ingredients } = recipe;
  const { id } = await prisma.recipe.create({
    data: {
      instruction,
      name,
      portions,
      userId,
      ingredients: { createMany: { data: ingredients } },
    },
  });
  if (recipes.length > 0) {
    await addRecipesToContainer(recipes, id);
  }
  return id;
};

export const addRecipesToContainer = async (
  containedRecipeIds: RecipeSearch[],
  containerRecipeId: string
) => {
  const data = containedRecipeIds.map(({ id, portions }) => ({
    containerRecipeId,
    containedRecipeId: id,
    portions,
  }));
  await prisma.recipe_recipe.createMany({ data });
};

export const getContained = async (
  recipeId: string
): Promise<RecipeSearch[]> => {
  const contained = await prisma.recipe_recipe.findMany({
    where: { containerRecipeId: recipeId },
    select: {
      containedRecipe: { select: { name: true, id: true, portions: true } },
    },
  });
  return contained.map(i => i.containedRecipe);
};
