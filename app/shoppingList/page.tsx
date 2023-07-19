'use client';
import React, { useEffect, useState } from 'react';
import { getShoppingList, getStoreOrder } from '../db/prisma';
import { ShoppingListType } from '@/types';

const ShoppingList = async () => {
  const [ingredients, setIngredients] = useState<ShoppingListType[]>([]);
  const [sortedIngredients, setSortedIngredients] = useState<
    ShoppingListType[]
  >([]);
  const [filter, setFilter] = useState({group: true})

  useEffect(() => {
    getShoppingList('Rasmus').then(i => setIngredients(i));
  }, []);

  // useEffect(() => {
  //   if(filter.group){
  //     ingredients.reduce((acc, cur) => {
  //       acc[] = {} 
  //     }, {})
  //   }
  // }, [filter]);

  const storeOrder = await getStoreOrder('Rasmus');
  const OrderId = storeOrder.map(s => s.id);
  const sortedIngredient = ingredients.sort(
    (a, b) => OrderId.indexOf(a.subCategory) - OrderId.indexOf(b.subCategory)
  );

  return (
    <ul>
      {sortedIngredient.map(i => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ul>
  );
};

export default ShoppingList;
