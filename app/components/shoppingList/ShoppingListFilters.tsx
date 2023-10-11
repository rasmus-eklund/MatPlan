import { ShoppingListFilter, StoreOrder } from '@/types';
import { ChangeEvent, FC } from 'react';

type ShoppingListFiltersProps = {
  filters: ShoppingListFilter;
  setFilters: (filters: ShoppingListFilter) => void;
};

const ShoppingListFilters: FC<ShoppingListFiltersProps> = ({
  filters,
  setFilters,
}) => {
  const handleChangeStore = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, selectedStore: e.target.value });
  };

  const handleGroupItems = () =>
    setFilters({ ...filters, group: !filters.group });

  const handleHideRecipe = () =>
    setFilters({ ...filters, hideRecipe: !filters.hideRecipe });

  return (
    <form className="flex justify-between">
      <select
        className="bg-4 rounded-md px-2 text-2 font-bold"
        name="store"
        id="store_select"
        value={filters.selectedStore}
        onChange={handleChangeStore}
      >
        {filters.stores.map(({ name, id }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <input
            onChange={handleGroupItems}
            checked={filters.group}
            type="checkbox"
            name="group_check"
            id="group_check"
          />
          <label className="text-1" htmlFor="group_check">
            Gruppera
          </label>
        </div>
        <div className="flex gap-2">
          <input
            onChange={handleHideRecipe}
            checked={filters.hideRecipe}
            type="checkbox"
            name="recipe_check"
            id="recipe_check"
          />
          <label className="text-1" htmlFor="recipe_check">
            Dölj ursprung
          </label>
        </div>
      </div>
    </form>
  );
};

export default ShoppingListFilters;
