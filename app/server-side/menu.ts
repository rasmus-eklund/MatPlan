"use server";
import { Day, MenuItem, Recipe, RecipeSearch } from "@/types";
import { prisma } from "./prisma";
import getUser from "./user";
import { getAllContained, getRecipeIngredientsRescaled } from "./utils";
import { getMenuRecipeById } from "./recipes";

export const addRecipeToMenu = async (recipe: Recipe, day: Day) => {
  const userId = await getUser();
  const allContained = await getAllContained({ ids: [], item: recipe });
  const ingredientsNested = await Promise.all(
    allContained.map((i) => getRecipeIngredientsRescaled(i.id, i.portions)),
  );

  const data = await prisma.menu.create({
    data: {
      recipeId: recipe.id,
      userId,
      portions: recipe.portions,
      day,
      shoppingListItem: {
        createMany: {
          data: ingredientsNested
            .flat()
            .map(({ checked, name, quantity, unit }) => ({
              checked,
              name,
              quantity,
              unit,
              userId,
            })),
        },
      },
    },
  });
  return { day: data.day as Day, id: data.id, portions: data.portions };
};

export const removeMenuItem = async (item: MenuItem): Promise<MenuItem> => {
  const userId = await getUser();
  const data = await prisma.menu.delete({
    where: { id: item.id, userId },
    select: { id: true, day: true, portions: true },
  });
  return { ...data, name: item.name, day: data.day as Day };
};

export const changeMenuItemPortions = async (
  item: MenuItem,
): Promise<MenuItem> => {
  const { id, portions, day } = item;
  const userId = await getUser();
  const recipe = await getMenuRecipeById(id);
  const allContained = await getAllContained({ ids: [], item: recipe });
  const scale = portions / recipe.portions;
  const AllContainedRescaled: RecipeSearch[] = allContained.map((item) => ({
    ...item,
    portions: item.portions * scale,
  }));
  const ingredientsNested = await Promise.all(
    AllContainedRescaled.map((i) =>
      getRecipeIngredientsRescaled(i.id, i.portions),
    ),
  );
  const data = await prisma.menu.update({
    where: { id },
    data: {
      portions: portions,
      shoppingListItem: {
        deleteMany: { menuId: id },
        createMany: {
          data: ingredientsNested
            .flat()
            .map(({ checked, name, quantity, unit }) => ({
              checked,
              name,
              quantity,
              unit,
              userId,
            })),
        },
      },
    },
  });
  return { day, id: data.id, portions: data.portions, name: recipe.name };
};

export const changeMenuItemDay = async ({
  day,
  id,
  name,
  portions,
}: MenuItem): Promise<MenuItem> => {
  const userId = await getUser();
  const data = await prisma.menu.update({
    where: { id, userId },
    data: { day },
    select: {
      day: true,
    },
  });
  return { id, name, portions, day: data.day as Day };
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const userId = await getUser();
  const data = await prisma.menu.findMany({
    where: { userId },
    select: {
      id: true,
      recipeId: true,
      day: true,
      portions: true,
      recipe: { select: { name: true } },
    },
  });
  const item: MenuItem[] = data.map((i) => {
    const {
      recipe: { name },
      day,
      ...rest
    } = i;
    return { ...rest, name, day: day as Day };
  });
  return item;
};
