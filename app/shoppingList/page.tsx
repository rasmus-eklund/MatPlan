import React, { useEffect } from "react";
import { getShoppingList, getStoreOrder } from "../db/prisma";

const ShoppingList = async () => {
  const ingredients = await getShoppingList("Rasmus");
  const storeOrder = await getStoreOrder("Rasmus");
  const OrderId = storeOrder.map((s) => s.id);
  const sortedIngredient = ingredients
    .flatMap((r) =>
      r.recipe.recipe_ingredient.map((i) => ({
        name: i.ingredientName,
        quantity: i.quantity,
        unit: i.unit,
        subCategory: i.ingredient.subcategoryId,
        id: i.id,
      }))
    )
    .sort(
      (a, b) => OrderId.indexOf(a.subCategory) - OrderId.indexOf(b.subCategory)
    );

  return (
    <ul>
      {sortedIngredient.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ul>
  );
};

export default ShoppingList;
