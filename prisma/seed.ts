import { prisma as db } from "@/app/server-side/prisma";
import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { z } from "zod";
const units = [
  "st",
  "g",
  "kg",
  "dl",
  "krm",
  "tsk",
  "msk",
  "ml",
  "cl",
  "l",
  "klyfta",
  "pkt",
  "port",
  "rec",
] as const;

const zIngredient = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  categoryId: z.number().positive(),
  subcategory: z.string().min(1),
  subcategoryId: z.number().positive(),
});
type Ingredient = z.infer<typeof zIngredient>;

const zRecipeIngredient = z.object({
  name: z.string().min(1),
  unit: z.enum(units),
  quantity: z.number().positive(),
});
type RecipeIngredient = z.infer<typeof zRecipeIngredient>;

const zRecipe = z.object({
  name: z.string().min(1),
  portions: z.number().positive(),
  instruction: z.string(),
  ingredients: z.array(zRecipeIngredient),
});

type Recipe = z.infer<typeof zRecipe>;

const saveIngs = async () => {
  const ings = await db.ingredient.findMany({
    include: {
      category: { select: { name: true } },
      subcategory: { select: { name: true } },
    },
  });

  const ingredients = ings.map(
    ({
      category: { name: category },
      subcategory: { name: subcategory },
      ...rest
    }) => {
      const ing: Ingredient = { ...rest, category, subcategory };
      return ing;
    },
  );

  writeFileSync(
    "C:/Users/rasmu/Documents/GitHub/RecipeJar/prisma/data/ingredients.json",
    JSON.stringify(ingredients, null, 2),
  );
  console.log("Saved ingredients");
};

const parseRecipe = (file: string) => {
  const data = readFileSync(file).toString();
  const parsed = zRecipe.safeParse(JSON.parse(data));
  if (!parsed.success) {
    console.log(parsed.error.message);
    throw new Error(parsed.error.message);
  } else {
    const recipe = parsed.data;
    if (recipe.ingredients.some((i) => i.unit === "rec")) {
      return {
        ...recipe,
        ingredients: recipe.ingredients.filter((i) => i.unit !== "rec"),
      };
    }
    return recipe;
  }
};

const readLocalRecipes = () => {
  const dir = "C:/Users/rasmu/Documents/GitHub/RecipeJar/prisma/data/recipes";
  const files = readdirSync(dir);
  const recipes: Recipe[] = [];
  for (const file of files) {
    recipes.push(parseRecipe(join(dir, file)));
  }
  return recipes;
};

const readDbRecipes = async (userId: string) => {
  const res = await db.recipe.findMany({
    where: { userId },
    include: { ingredients: true },
  });

  const data = res.map(({ ingredients, userId, id, ...rest }) => {
    return {
      ...rest,
      ingredients: ingredients.map(({ name, quantity, unit }) => ({
        name,
        quantity: Number(quantity),
        unit,
      })),
    };
  });
  const parsed = z.array(zRecipe).safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  return parsed.data;
};
const saveRecipes = async (recipes: Recipe[]) => {
  writeFileSync(
    "C:/Users/rasmu/Documents/GitHub/RecipeJar/prisma/data/recipes.json",
    JSON.stringify(recipes, null, 2),
  );
};

const main = async () => {
  const userId = "eklund.rasmus44@gmail.com";
  const local = readLocalRecipes();
  const database = await readDbRecipes(userId);
  const recipes = [...local, ...database];
  const all = recipes.map(({ name }) => name);
  const unique = new Set(all);
  if (Array.from(unique).length !== all.length) {
    throw new Error("duplicates found!");
  } else {
    console.log("No duplicates found!");
  }
  await saveIngs();
  await saveRecipes(recipes);
};

main()
  .then(() => console.log("Done seeding!"))
  .catch(() => console.log("error seeding"));
