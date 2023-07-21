'use client';
import React, { useEffect, useState } from 'react';
import {
  getExtraIngredients,
  getShoppingList,
  getStoreOrder,
} from '../db/prisma';
import { ShoppingListType } from '@/types';

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<ShoppingListType[]>([]);
  const [sortedIngredients, setSortedIngredients] = useState<
    ShoppingListType[]
  >([]);
  const [filter, setFilter] = useState({ group: true });

  useEffect(() => {
    Promise.all([getShoppingList(), getExtraIngredients()]).then(([a, b])=> setIngredients([...a, ...b]))
  }, []);

  // const storeOrder = await getStoreOrder('jarjar.jarsson@gmail.com');
  // const OrderId = storeOrder.map(s => s.id);
  // const sortedIngredient = ingredients.sort(
  //   (a, b) => OrderId.indexOf(a.subCategory) - OrderId.indexOf(b.subCategory)
  // );

  return (
    <ul>
      {ingredients.map(i => (
        <li key={i.name + '_shoppingList'} className="grid grid-cols-3">
          <p>{i.name}</p>
          <p>{i.quantity}</p>
          <p>{i.unit}</p>
        </li>
      ))}
    </ul>
  );
};

export default ShoppingList;
