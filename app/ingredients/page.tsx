'use client';
import { useEffect, useState } from 'react';
import SearchIngredients from '../components/SearchIngredient';
import { Home, ShoppingListItem } from '@/types';
import EditIngredient from '../components/EditIngredient';
import { getHome, addHome, removeHome } from '../db/home';
import {
  createItem,
  deleteItem,
  getShoppingList,
  updateItem,
} from '../db/items';

const Ingredients = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [itemsHome, setItemsHome] = useState<Home[]>([]);

  useEffect(() => {
    Promise.all([getShoppingList(), getHome()]).then(([items, home]) => {
      setItems(items);
      setItemsHome(home);
    });
  }, []);

  const isHome = (name: string) => {
    const home = Boolean(itemsHome.some(n => n.name === name));
    if (home) {
    }
    return home;
  };

  const handleChange = async (check: boolean, name: string) => {
    check ? await addHome(name) : await removeHome(name);
  };

  const addIngredient = async (name: string) => {
    const ing = await createItem({
      name,
      quantity: 1,
      unit: 'st',
    });
    setItems(items => [...items, ing]);
  };

  const handleSave = async (ing: ShoppingListItem) => {
    await updateItem(ing);
    setItems(items => {
      const index = items.findIndex(i => i.id === ing.id);
      const newItems = items;
      newItems[index] = ing;
      return newItems;
    });
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setItems(items => items.filter(i => i.id !== id));
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
            {items
              .filter(i => i.from === 'extraItem')
              .map(i => (
                <EditIngredient
                  remove={() => handleDelete(i.id)}
                  save={ing => handleSave({ ...i, ...ing })}
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
            {items
              .filter(i => i.from !== 'extraItem')
              .map(i => (
                <EditIngredient
                  remove={() => handleDelete(i.id)}
                  save={ing => handleSave({ ...i, ...ing })}
                  ingredient={i}
                  key={i.id}
                  editable={false}
                />
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Ingredients;
