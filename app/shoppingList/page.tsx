"use client";
import React, { useEffect, useState } from "react";
import { Home, ShoppingListFilter, ShoppingListItem } from "@/types";
import { getHome, getShoppingList, updateItem } from "../server-side/items";
import { getAllStores } from "../server-side/stores";
import Loading from "../components/Loading";
import ShoppingListFilters from "../components/shoppingList/ShoppingListFilters";
import ShoppingList from "../components/shoppingList/ShoppingList";
import { isHome } from "../utils/utils";

const ShoppingListPage = () => {
  const [items, setItems] = useState<ShoppingListItem[]>();
  const [home, setHome] = useState<Home[]>();
  const [filters, setFilters] = useState<ShoppingListFilter>();

  useEffect(() => {
    Promise.all([getAllStores(), getShoppingList(), getHome()]).then(
      ([allStores, shoppingList, homeItems]) => {
        setItems(shoppingList);
        setFilters({
          group: false,
          hideRecipe: false,
          selectedStore: allStores[0].id,
          stores: allStores,
        });
        setHome(homeItems);
      },
    );
  }, []);

  const handleCheckItems = (updatedItems: ShoppingListItem[]) => {
    if (items) {
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
    }
  };

  return (
    <>
      {filters && items && home ? (
        <div className="flex flex-col gap-2">
          <ShoppingListFilters filters={filters} setFilters={setFilters} />
          <div className="rounded-md bg-c5 p-2 flex flex-col gap-2">
            <ShoppingList
              filters={filters}
              handleCheckItems={handleCheckItems}
              items={home ? items.filter((i) => !isHome(i.name, home)) : items}
            />
            {home.length !== 0 && (
              <>
                <h2 className="text-c5 text-lg">Varor hemma</h2>
                <ShoppingList
                  filters={filters}
                  items={items.filter((i) => isHome(i.name, home))}
                  handleCheckItems={handleCheckItems}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ShoppingListPage;
