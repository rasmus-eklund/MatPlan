import { Recipe, RecipeSearch, ShoppingListItem, Unit } from "@/types";
import { prisma } from "./prisma";
import { getRecipeById } from "./recipes";

export const getRecipeIngredientsRescaled = async (
  id: string,
  newPortions: number,
): Promise<ShoppingListItem[]> => {
  const { ingredients, portions } = await prisma.recipe.findUniqueOrThrow({
    where: { id },
    select: {
      portions: true,
      ingredients: {
        select: {
          id: true,
          name: true,
          quantity: true,
          unit: true,
          ingredient: { select: { subcategoryId: true } },
        },
      },
    },
  });
  const scale = newPortions / portions;
  return ingredients.map((i) => {
    const {
      ingredient: { subcategoryId },
      quantity,
      unit,
      ...rest
    } = i;
    return {
      ...rest,
      checked: false,
      quantity: Number(quantity) * scale,
      unit: unit as Unit,
      subcategoryId,
    };
  });
};

type Params = {
  ids: RecipeSearch[];
  item: Recipe;
};

export const getAllContained = async ({
  ids,
  item: { children, id, name, portions },
}: Params): Promise<RecipeSearch[]> => {
  if (children.length === 0) {
    return [{ name, id, portions }];
  }
  let result: RecipeSearch[] = [{ id, name, portions }];
  for (const child of children) {
    const recipe = await getRecipeById(child.id);
    const childsChildren: RecipeSearch[] = await getAllContained({
      ids: [...ids, child],
      item: recipe,
    });
    result = [...result, ...childsChildren];
  }
  return result;
};
