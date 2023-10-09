import {
  IngredientCat,
  ShoppingListFilter,
  ShoppingListItem,
  Store,
} from '@/types';
import { FC, useEffect, useState } from 'react';
import { getStoreById } from '../db/stores';
import Item from './ShoppingListItem';
import { sortShoppingList } from '../utils/utils';

type SelectStoreProps = {
  stores: { name: string; id: string }[];
  items: ShoppingListItem[];
  categories: IngredientCat[];
};

const SelectStore: FC<SelectStoreProps> = ({ stores, items, categories }) => {
  const [store, setStore] = useState<Store>();
  const [option, setOption] = useState<string>(stores[0].id);
  const [filter, setFilter] = useState<ShoppingListFilter>({
    group: false,
    hideRecipe: false,
  });

  useEffect(() => {
    getStoreById(option).then(res => setStore(res));
  }, [option]);

  return (
    <div className="bg-3 rounded-md p-3 flex flex-col gap-2">
      <div className="flex justify-between">
        <select
          className="bg-4 rounded-md px-2 text-2 font-bold"
          name="store"
          id="store_select"
          value={option}
          onChange={e => setOption(e.target.value)}
        >
          {stores.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <input
              onChange={() => setFilter({ ...filter, group: !filter.group })}
              checked={filter.group}
              type="checkbox"
              name="group_check"
              id="group_check"
            />
            <label className="text-1" htmlFor="group_check">
              Gruppera ingredienser
            </label>
          </div>
          <div className="flex gap-2">
            <input
              onChange={() =>
                setFilter({ ...filter, hideRecipe: !filter.hideRecipe })
              }
              checked={filter.hideRecipe}
              type="checkbox"
              name="recipe_check"
              id="recipe_check"
            />
            <label className="text-1" htmlFor="recipe_check">
              Dölj tillhörighet
            </label>
          </div>
        </div>
      </div>
      <ul className="flex flex-col bg-2 rounded-md p-2 gap-1">
        {store &&
          sortShoppingList(store, items, categories).map(item => (
            <Item key={item.id} item={item} filter={filter} />
          ))}
      </ul>
    </div>
  );
};

export default SelectStore;
