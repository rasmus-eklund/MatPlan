"use client";
import React, { useEffect, useState } from "react";
import { ShoppingListFilter, ShoppingListItem } from "@/types";
import { getShoppingList, updateItem } from "../server-side/items";
import { getAllStores } from "../server-side/stores";
import Loading from "../components/Loading";
import ShoppingListFilters from "../components/shoppingList/ShoppingListFilters";
import ShoppingList from "../components/shoppingList/ShoppingList";

const ShoppingListPage = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [filters, setFilters] = useState<ShoppingListFilter>();

  useEffect(() => {
    Promise.all([getAllStores(), getShoppingList()]).then(
      ([allStores, shoppingList]) => {
        setItems(shoppingList);
        setFilters({
          group: false,
          hideRecipe: false,
          selectedStore: allStores[0].id,
          stores: allStores,
        });
      },
    );
  }, []);

  const handleCheckItems = (updatedItems: ShoppingListItem[]) => {
    const newItems = [
      ...items.filter((i) => !updatedItems.some((item) => item.id === i.id)),
      ...updatedItems,
    ];
    setItems(newItems);
    Promise.all(
      updatedItems.map((item) =>
        updateItem({
          id: item.id,
          checked: item.checked,
          quantity: item.quantity,
          unit: item.unit,
        }),
      ),
    );
  };
  return (
    <main className="bg-2 p-5 grow overflow-y-auto">
      {filters && items ? (
        <div className="bg-3 rounded-md p-3 flex flex-col gap-2">
          <ShoppingListFilters filters={filters} setFilters={setFilters} />
          <ShoppingList
            filters={filters}
            handleCheckItems={handleCheckItems}
            items={items}
          />
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default ShoppingListPage;
