import { ShoppingListType } from '@/types';

export const groupItems = (items: ShoppingListType[]): ShoppingListType[] =>
  items.reduce((acc: ShoppingListType[], cur) => {
    const match = acc.findIndex(
      (i: ShoppingListType) => i.name === cur.name && i.unit === cur.unit
    );
    const item: ShoppingListType = { ...cur };
    if (match === -1) {
      acc.push(item);
    } else {
      acc[match].quantity += item.quantity;
    }
    return acc;
  }, []);

// const groupedMenuItems: Record<string, GroupedMenuItem> = {};

// menuItems.forEach(menuItem => {
//   const { recipe } = menuItem;

//   recipe.recipe_ingredient.forEach(recipeIngredient => {
//     const { ingredient, quantity, unit } = recipeIngredient;
//     const quant = quantity? Number(quantity) : 0;
//     const { name } = ingredient;

//     const key = `${name}-${unit}`;

//     if (!groupedMenuItems[key]) {
//       groupedMenuItems[key] = {
//         name: ingredient.name,
//         unit: unit,
//         quantity: 0,
//         subcategory: ingredient.subcategory.categoryId,
//       };
//     }

//     groupedMenuItems[key].quantity += quant;
//   });
// });

// const result = Object.values(groupedMenuItems);

// console.log(result);
