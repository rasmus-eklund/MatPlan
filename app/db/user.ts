"use server";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import { prisma } from "./prisma";
import createDefaultRecipes from "./constants/recipes/recieps";

import { addRecipe } from "./recipes";
import { addDefaultStore } from "./stores";

const getUser = async () => {
  const session = await getServerSession(options);
  if (!session?.user?.email) {
    throw new Error("No user");
  }
  return session.user.email;
};

export const checkNewUser = async () => {
  const userId = await getUser();
  const users = await prisma.user.findUnique({ where: { id: userId } });
  if (users === null) {
    await prisma.user.create({ data: { id: userId } });
    await addDefaultStore();
    await addDefaultRecipes();
  }
};

export const addDefaultRecipes = async () => {
  const recipes = createDefaultRecipes();
  for (const recipe of recipes) {
    await addRecipe(recipe);
  }
};

export default getUser;
