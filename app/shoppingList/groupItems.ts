type GroupedMenuItem = {
  name: string;
  quantity: number;
  unit: string;
  subCategory: number;
  from: string;
};
type Grouped = {
  name: string;
  quantity: number;
  unit: string;
  subCategory: number;
};
// const groupItems = (items: GroupedMenuItem[]) => {
//   const groupedItems: Grouped[] = items.reduce((acc, cur) => {
//     const match = acc.findIndex(
//       (i: GroupedMenuItem) => i.name === cur.name && i.unit === cur.unit
//     );
//     const newAcc = [...acc];
//     if (match === -1) {
//       const newItem: Grouped = {...cur};
//       newAcc.push(newItem)
//     }
//     return newAcc;
//   }, []);
// };

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
