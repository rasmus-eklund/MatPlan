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
} from "../server-side/items";
import AddHomeButton from "../components/buttons/AddHomeButton";
import { isHome, Optimistic, toShopListItem } from "../utils/utils";
import Loading from "../components/Loading";

const Ingredients = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [home, setHome] = useState<Home[]>([]);
  const [optItems, setOptItems] = useOptimistic(items);
  const [optHome, setOptHome] = useOptimistic(home);
  const [loading, setLoading] = useState(true);
  const optiHome = Optimistic({
    setOpt: setOptHome,
    setItems: setHome,
  });
  const optiItem = Optimistic({
    setOpt: setOptItems,
    setItems: setItems,
  });

  useEffect(() => {
    Promise.all([getShoppingList(), getHome()])
      .then(([items, home]) => {
        setItems(items);
        setHome(home);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-1/2">
        <SearchIngredients
          callback={(ing) =>
            optiItem.add({ item: toShopListItem(ing), cb: createItem })
          }
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-c3 p-3 rounded-md">
            <h2 className="text-c5">Extra varor:</h2>
            <ul className="flex flex-col gap-2">
              {optItems
                .filter((i) => !i.recipe)
                .map((item) => (
                  <EditIngredient<ShoppingListItem>
                    remove={() => optiItem.remove({ item, cb: deleteItem })}
                    update={(ing) =>
                      optiItem.update({
                        item: { ...item, ...ing },
                        cb: updateItem,
                      })
                    }
                    ingredientIn={item}
                    key={item.id}
                    editable={true}
                  />
                ))}
            </ul>
          </div>
          <div className="bg-c3 p-3 rounded-md">
            <h2 className="text-c5">Recept varor:</h2>
            <ul className="flex flex-col gap-2">
              {optItems
                .filter((i) => i.recipe)
                .map((item) => (
                  <EditIngredient<ShoppingListItem>
                    remove={() => optiItem.remove({ item, cb: deleteItem })}
                    update={(ing) =>
                      optiItem.update({
                        item: { ...item, ...ing },
                        cb: updateItem,
                      })
                    }
                    ingredientIn={item}
                    key={item.id}
                    editable={false}
                  >
                    <AddHomeButton
                      home={isHome(item.name, optHome)}
                      callback={(home) => {
                        home
                          ? optiHome.add({
                              item: {
                                id: item.name,
                                quantity: null,
                                unit: null,
                              },
                              cb: addHome,
                            })
                          : optiHome.remove({
                              item: {
                                id: item.name,
                                quantity: null,
                                unit: null,
                              },
                              cb: removeHome,
                            });
                      }}
                    />
                  </EditIngredient>
                ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Ingredients;
