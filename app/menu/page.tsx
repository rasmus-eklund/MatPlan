'use client';
import {
  changeMenuItemDay,
  changeMenuItemPortions,
  getMenuItems,
  removeMenuItem,
} from '../db/menu';
import { MenuItem } from '@/types';
import {
  useEffect,
  useState,
  experimental_useOptimistic as useOptimistic,
} from 'react';
import days from '../constants/days';
import {
  SortMenuItems,
  removeItemOptimistic,
  updateItemOptimistic,
} from '../utils/utils';
import MenuItemComponent from '../components/menu/MenuItemComponent';

const Menu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [optMenu, setOptMenu] = useOptimistic(menu);

  useEffect(() => {
    getMenuItems().then(data => setMenu(data));
  }, []);

  const handleRemoveItem = async (id: string) => {
    removeItemOptimistic({
      id,
      setOpt: setOptMenu,
      setItems: setMenu,
      callback: removeMenuItem,
    });
  };

  const handleChangeDay = async (item: MenuItem) => {
    updateItemOptimistic({
      item,
      setOpt: setOptMenu,
      setItems: setMenu,
      callback: changeMenuItemDay,
    });
  };

  const handleChangePortions = async (item: MenuItem) => {
    updateItemOptimistic({
      item,
      setOpt: setOptMenu,
      setItems: setMenu,
      callback: changeMenuItemPortions,
    });
  };

  return (
    <>
      <main className="flex flex-col bg-2 p-6 grow overflow-y-auto">
        <ul className=" flex flex-col gap-2">
          {days.map(day => (
            <li key={day} className="bg-3 p-2 rounded-md flex flex-col">
              <h2 className="text-3xl text-1 font-bold p-2 rounded-md">
                {day}
              </h2>
              <ul className="flex flex-col gap-2">
                {SortMenuItems(optMenu, day).map(item => (
                  <MenuItemComponent
                    key={item.id}
                    item={item}
                    changeDay={handleChangeDay}
                    changePortions={handleChangePortions}
                    removeItem={handleRemoveItem}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Menu;
