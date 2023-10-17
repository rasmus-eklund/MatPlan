"use server";
import { Category, IngredientCat, Subcategory } from "@/types";
import { prisma } from "./prisma";

export const getCategories = async (): Promise<Category[]> => {
  const data = await prisma.category.findMany();
  return data;
};

export const getSubcategories = async (): Promise<Subcategory[]> => {
  const data = await prisma.subcategory.findMany();
  return data;
};

export const addIngredient = async ({
  name,
  categoryId,
  subcategoryId,
}: IngredientCat): Promise<IngredientCat> => {
  const data: IngredientCat = await prisma.ingredient.create({
    data: { name, categoryId, subcategoryId },
  });
  return data;
};

export const deleteIngredient = async (name: string) => {
  const response: IngredientCat = await prisma.ingredient.delete({
    where: { name },
  });
  return response;
};

export const updateIngredient = async ({
  name,
  categoryId,
  subcategoryId,
}: IngredientCat) => {
  const response: IngredientCat = await prisma.ingredient.update({
    where: { name },
    data: { categoryId, subcategoryId },
  });
  return response;
};
