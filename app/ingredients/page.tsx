'use client';
import {
  useEffect,
  useState,
  experimental_useOptimistic as useOptimistic,
} from 'react';
import SearchIngredients from '../components/SearchIngredient';
import { Home, IngredientCat, ShoppingListItem } from '@/types';
import EditIngredient from '../components/EditIngredient';
import {
  addHome,
  createItem,
  deleteItem,
  getHome,
  getShoppingList,
  removeHome,
  updateItem,
} from '../db/items';
import AddHomeButton from '../components/buttons/AddHomeButton';
import { OptimisticAdd, isHome, OptimisticRemove, OptimisticUpdate } from '../utils/utils';

const Ingredients = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [home, setHome] = useState<Home[]>([]);
  const [optItems, setOptItems] = useOptimistic(items);
  const [optHome, setOptHome] = useOptimistic(home);

  useEffect(() => {
    Promise.all([getShoppingList(), getHome()]).then(([items, home]) => {
      setItems(items);
      setHome(home);
    });
  }, []);

  const handleAddHome = (item: Home) => {
    OptimisticAdd({
      item,
      setOpt: setOptHome,
      setItems: setHome,
      callback: addHome,
    });
  };

  const handleRemoveHome = (id: string) => {
    OptimisticRemove({
      id,
      setOpt: setOptHome,
      setItems: setHome,
      callback: removeHome,
    });
  };

  const addIngredient = async ({ name, subcategoryId }: IngredientCat) => {
    const item: ShoppingListItem = {
      name,
      quantity: 1,
      unit: 'st',
      checked: false,
      id: crypto.randomUUID(),
      subcategoryId,
    };
    OptimisticAdd({
      item,
      setOpt: setOptItems,
      setItems,
      callback: createItem,
    });
  };

  const handleUpdate = async (item: ShoppingListItem) => {
    OptimisticUpdate({
      item,
      setOpt: setOptItems,
      setItems,
      callback: updateItem,
    });
  };

  const handleDelete = async (id: string) => {
    OptimisticRemove({
      id,
      setOpt: setOptItems,
      setItems,
      callback: deleteItem,
    });
  };

  return (
    <main className="bg-2 p-5 grow overflow-y-auto">
      <div className="bg-3 p-5 rounded-md flex flex-col gap-3">
        <div className="w-1/2">
          <SearchIngredients callback={addIngredient} />
        </div>
        <div className="bg-2 p-3 rounded-md">
          <h2 className="text-3">Extra varor:</h2>
          <ul className="flex flex-col gap-2">
            {optItems
              .filter(i => !i.recipe)
              .map(i => (
                <EditIngredient
                  remove={() => handleDelete(i.id)}
                  update={ing => handleUpdate({ ...i, ...ing })}
                  ingredient={i}
                  key={i.id}
                  editable={true}
                />
              ))}
          </ul>
        </div>
        <div className="bg-2 p-3 rounded-md">
          <h2 className="text-3">Recept varor:</h2>
          <ul className="flex flex-col gap-2">
            {optItems
              .filter(i => i.recipe)
              .map(i => (
                <EditIngredient
                  remove={() => handleDelete(i.id)}
                  update={ing => handleUpdate({ ...i, ...ing })}
                  ingredient={i}
                  key={i.id}
                  editable={false}
                >
                  <AddHomeButton
                    home={isHome(i.name, optHome)}
                    callback={home => {
                      home
                        ? handleAddHome({
                            id: i.name,
                            quantity: null,
                            unit: null,
                          })
                        : handleRemoveHome(i.name);
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
