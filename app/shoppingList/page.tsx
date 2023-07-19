import React, { useEffect } from 'react';
import { getShoppingList } from '../db/prisma';

const ShoppingList = async () => {
  const ingredients = await getShoppingList('Rasmus');
  return (
    <ul>
      {ingredients.flatMap(r =>
        r.recipe.recipe_ingredient.map(i => <li>{i.ingredientName}</li>)
      )}
    </ul>
  );
};

export default ShoppingList;
