"use server";
import { Recipe, RecipeSearch, SearchParams, Unit } from "@/types";
import { prisma } from "./prisma";
import getUser from "./user";

export const getRecipeByName = async (
  search: string,
): Promise<RecipeSearch[]> => {
  const userId = await getUser();
  const res = await prisma.recipe.findMany({
    where: { userId, name: { contains: search, mode: "insensitive" } },
    select: { name: true, id: true, portions: true },
  });
  return res;
};

export const getRecipeByInstructions = async (
  search: string,
): Promise<RecipeSearch[]> => {
  const userId = await getUser();
  return await prisma.recipe.findMany({
    where: { userId, instruction: { contains: search, mode: "insensitive" } },
    select: { name: true, id: true, portions: true },
  });
};

export const getRecipeByIngredient = async (
  search: string,
): Promise<RecipeSearch[]> => {
  const userId = await getUser();
  return await prisma.recipe.findMany({
    where: {
      userId,
      ingredients: {
        some: { name: { contains: search, mode: "insensitive" } },
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
  if (filter === "ingredient") {
    data = await getRecipeByIngredient(search);
  }
  if (filter === "instruction") {
    data = await getRecipeByInstructions(search);
  }
  if (filter === "name") {
    data = await getRecipeByName(search);
  }
  return data;
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  const userId = await getUser();
  const data = await prisma.recipe.findUniqueOrThrow({
    where: { id, userId },
    select: {
      id: true,
      name: true,
      portions: true,
      instruction: true,
      ingredients: true,
      containers: {
        select: {
          containedRecipe: { select: { name: true, id: true, portions: true } },
        },
      },
    },
  });
  const { containers, ...rest } = data;
  const recipe: Recipe = {
    ...rest,
    portions: Number(data.portions),
    ingredients: data.ingredients.map((i) => ({
      ...i,
      quantity: Number(i.quantity),
      unit: i.unit as Unit,
    })),
    children: containers.map((i) => i.containedRecipe),
  };
  return recipe;
};

export const getMenuRecipeById = async (menuId: string): Promise<Recipe> => {
  const data = await prisma.menu.findUniqueOrThrow({
    where: { id: menuId },
    select: {
      recipe: {
        select: {
          id: true,
          name: true,
          instruction: true,
          portions: true,
          ingredients: true,
          containers: {
            select: {
              containedRecipe: {
                select: { name: true, id: true, portions: true },
              },
            },
          },
        },
      },
    },
  });
  const {
    recipe: { instruction, name, containers, id, ingredients, portions },
  } = data;
  return {
    id,
    ingredients: ingredients.map((i) => ({
      ...i,
      unit: i.unit as Unit,
      recipeId: menuId,
      quantity: Number(i.quantity),
    })),
    instruction,
    name,
    portions,
    children: containers.map(({ containedRecipe }) => containedRecipe),
  };
};

export const updateRecipe = async (recipe: Recipe) => {
  const updatedRecipe = await prisma.recipe.update({
    where: { id: recipe.id },
    data: {
      name: recipe.name,
      portions: recipe.portions,
      instruction: recipe.instruction,
      ingredients: {
        deleteMany: { recipeId: recipe.id },
      },
      containers: {
        deleteMany: { containerRecipeId: recipe.id },
        createMany: {
          data: recipe.children.map((i) => ({
            containedRecipeId: i.id,
            portions: i.portions,
          })),
        },
      },
    },
  });
  await prisma.recipe_ingredient.createMany({
    data: recipe.ingredients.map((i) => ({ ...i, recipeId: recipe.id })),
  });
  return updatedRecipe.id;
};

export const deleteRecipe = async (id: string) => {
  const userId = await getUser();
  await prisma.recipe.delete({ where: { id, userId } });
};

export const addRecipe = async (recipe: Recipe) => {
  const { ingredients, children, ...rest } = recipe;
  const userId = await getUser();
  const { id } = await prisma.recipe.create({
    data: {
      ...rest,
      userId,
      ingredients: {
        createMany: {
          data: ingredients.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            unit: i.unit,
          })),
        },
      },
    },
  });
  if (children.length > 0) {
    await addRecipesToContainer(children, id);
  }
  return id;
};

export const addRecipesToContainer = async (
  containedRecipeIds: RecipeSearch[],
  containerRecipeId: string,
) => {
  const data = containedRecipeIds.map(({ id, portions }) => ({
    containerRecipeId,
    containedRecipeId: id,
    portions,
  }));
  await prisma.recipe_recipe.createMany({ data });
};
