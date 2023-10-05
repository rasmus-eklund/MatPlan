'use server';
import {
  Recipe,
  RecipeFront,
  RecipeIngredientFront,
  RecipeSearch,
} from '@/types';
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

export const getRecipeById = async (id: string): Promise<Recipe> => {
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
  recipes: string[],
  id: string
) => {
  const userId = await getUser();

  const updatedRecipe = await prisma.recipe.update({
    where: { id, userId },
    data: {
      name: recipe.name,
      portions: recipe.portions,
      instruction: recipe.instruction,
      ingredients: { deleteMany: { recipeId: id } },
      containers: { deleteMany: { containerRecipeId: id } },
    },
  });
  await addRecipeIngredients(recipe.ingredients, id);
  await addRecipesToContainer(recipes, id);
  return updatedRecipe.id;
};

export const deleteRecipe = async (id: string) => {
  const userId = await getUser();
  await prisma.recipe.delete({ where: { id, userId } });
};

export const addRecipe = async (recipe: RecipeFront, recipes: string[]) => {
  const userId = await getUser();
  const { name, instruction, portions, ingredients } = recipe;
  const { id } = await prisma.recipe.create({
    data: { instruction, name, portions, userId },
  });
  await addRecipeIngredients(ingredients, id);
  await addRecipesToContainer(recipes, id);
  return id;
};

export const addRecipeIngredients = async (
  ingredients: RecipeIngredientFront[],
  recipeId: string
) => {
  const newIngs = ingredients.map(ing => ({ ...ing, recipeId }));
  await prisma.recipe_ingredient.createMany({ data: newIngs });
};

export const addRecipesToContainer = async (
  containedRecipeIds: string[],
  containerRecipeId: string
) => {
  const data = containedRecipeIds.map(id => ({
    containerRecipeId,
    containedRecipeId: id,
  }));
  await prisma.recipe_recipe.createMany({ data });
};

export const getContained = async (recipeId: string): Promise<RecipeSearch[]> => {
  const contained = await prisma.recipe_recipe.findMany({
    where: { containerRecipeId: recipeId },
    select: {
      containedRecipe: { select: { name: true, id: true, portions: true } },
    },
  });
  return contained.map(i => i.containedRecipe);
};
