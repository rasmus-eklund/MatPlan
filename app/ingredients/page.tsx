'use client';
import {
  useEffect,
  useState,
  experimental_useOptimistic as useOptimistic,
} from 'react';
import SearchIngredients from '../components/SearchIngredient';
import { Home, ShoppingListItem } from '@/types';
import EditIngredient from '../components/EditIngredient';
import { editHome, getHome } from '../db/home';
import {
  createItem,
  deleteItem,
  getShoppingList,
  updateItem,
} from '../db/items';
import AddHomeButton from '../components/buttons/AddHomeButton';
import { isHome } from '../utils/utils';

type Items = { items: ShoppingListItem[]; home: Home[] };

const Ingredients = () => {
  const [items, setItems] = useState<Items>({ items: [], home: [] });
  const [optimisticItems, setOptimisticItems] = useOptimistic(items);

  useEffect(() => {
    Promise.all([getShoppingList(), getHome()]).then(([newItems, newHome]) => {
      setItems(({ items, home }) => ({
        items: [...items, ...newItems],
        home: [...home, ...newHome],
      }));
    });
  }, []);

  const handleHome = async (check: boolean, name: string) => {
    setOptimisticItems(({ items, home }) =>
      check
        ? { items, home: [...home, { name, quantity: null, unit: null }] }
        : { items, home: home.filter(i => i.name !== name) }
    );
    await editHome({ name, quantity: null, unit: null }, check);
    setItems(({ items, home }) =>
      check
        ? { items, home: [...home, { name, quantity: null, unit: null }] }
        : { items, home: home.filter(i => i.name !== name) }
    );
  };

  const addIngredient = async (name: string) => {
    const newItem: ShoppingListItem = {
      name,
      quantity: 1,
      unit: 'st',
      checked: false,
      from: 'extraItem',
      id: 'placeholder',
    };
    setOptimisticItems(({ items, home }) => ({
      items: [...items, { ...newItem, checked: false, id: 'placeholder' }],
      home,
    }));
    const ing = await createItem({
      name: newItem.name,
      quantity: newItem.quantity,
      unit: newItem.unit,
    });
    setItems(({ items, home }) => ({ items: [...items, ing], home }));
  };

  const handleUpdate = async (ing: ShoppingListItem) => {
    setOptimisticItems(({ items, home }) => {
      const index = items.findIndex(item => item.id === ing.id);
      items[index] = ing;
      return { items, home };
    });
    const updatedItem = await updateItem(ing);
    setItems(({ items, home }) => {
      const index = items.findIndex(item => item.id === ing.id);
      items[index] = updatedItem;
      return { items, home };
    });
  };

  const handleDelete = async (id: string) => {
    setOptimisticItems(({ items, home }) => ({
      items: items.filter(i => i.id !== id),
      home,
    }));
    const deletedId = await deleteItem(id);
    setItems(({ items, home }) => ({
      items: items.filter(i => i.id !== deletedId),
      home,
    }));
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
            {optimisticItems.items
              .filter(i => i.from === 'extraItem')
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
            {optimisticItems.items
              .filter(i => i.from !== 'extraItem')
              .map(i => (
                <EditIngredient
                  remove={() => handleDelete(i.id)}
                  update={ing => handleUpdate({ ...i, ...ing })}
                  ingredient={i}
                  key={i.id}
                  editable={false}
                >
                  <AddHomeButton
                    home={isHome(i.name, items.home)}
                    callback={home => handleHome(home, i.name)}
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
