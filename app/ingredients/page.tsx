"use client";
import {
  useEffect,
  useState,
  experimental_useOptimistic as useOptimistic,
} from "react";
import SearchIngredients from "../components/SearchIngredient";
import { Home, ShoppingListItem } from "@/types";
import EditIngredient from "../components/EditIngredient";
import {
  addHome,
  createItem,
  deleteItem,
  getHome,
  getShoppingList,
  removeHome,
  updateItem,
} from "../db/items";
import AddHomeButton from "../components/buttons/AddHomeButton";
import { isHome, Optimistic, toShopListItem } from "../utils/utils";

const Ingredients = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [home, setHome] = useState<Home[]>([]);
  const [optItems, setOptItems] = useOptimistic(items);
  const [optHome, setOptHome] = useOptimistic(home);
  const optimisticHome = Optimistic({
    setOpt: setOptHome,
    setItems: setHome,
  });
  const optimisticItem = Optimistic({
    setOpt: setOptItems,
    setItems: setItems,
  });

  useEffect(() => {
    Promise.all([getShoppingList(), getHome()]).then(([items, home]) => {
      setItems(items);
      setHome(home);
    });
  }, []);

  return (
    <main className="bg-2 p-5 grow overflow-y-auto">
      <div className="bg-3 p-5 rounded-md flex flex-col gap-3">
        <div className="w-1/2">
          <SearchIngredients
            callback={(ing) =>
              optimisticItem.add({ item: toShopListItem(ing), cb: createItem })
            }
          />
        </div>
        <div className="bg-2 p-3 rounded-md">
          <h2 className="text-3">Extra varor:</h2>
          <ul className="flex flex-col gap-2">
            {optItems
              .filter((i) => !i.recipe)
              .map((item) => (
                <EditIngredient
                  remove={() => optimisticItem.remove({ item, cb: deleteItem })}
                  update={(ing) =>
                    optimisticItem.update({
                      item: { ...item, ...ing },
                      cb: updateItem,
                    })
                  }
                  ingredient={item}
                  key={item.id}
                  editable={true}
                />
              ))}
          </ul>
        </div>
        <div className="bg-2 p-3 rounded-md">
          <h2 className="text-3">Recept varor:</h2>
          <ul className="flex flex-col gap-2">
            {optItems
              .filter((i) => i.recipe)
              .map((item) => (
                <EditIngredient
                  remove={() => optimisticItem.remove({ item, cb: deleteItem })}
                  update={(ing) =>
                    optimisticItem.update({
                      item: { ...item, ...ing },
                      cb: updateItem,
                    })
                  }
                  ingredient={item}
                  key={item.id}
                  editable={false}
                >
                  <AddHomeButton
                    home={isHome(item.name, optHome)}
                    callback={(home) => {
                      home
                        ? optimisticHome.add({
                            item: {
                              id: item.name,
                              quantity: null,
                              unit: null,
                            },
                            cb: addHome,
                          })
                        : optimisticHome.remove({ item, cb: removeHome });
                    }}
                  />
                </EditIngredient>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Ingredients;
