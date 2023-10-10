'use client';
import { getMenuItems } from '../db/menu';
import { Day, MenuItem as MenuItemType } from '@/types';
import React, { useEffect, useState } from 'react';
import MenuItem from '../components/menu/MenuItem';
import days from '../utils/days';

const Menu = () => {
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  useEffect(() => {
    getMenuItems().then(data => setMenu(data));
  }, []);

  const update = async () => {
    setMenu(await getMenuItems());
  };

  const toSorted = (items: MenuItemType[], day: Day) => {
    return items
      .filter(r => r.day === day)
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
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
                {toSorted(menu, day).map(r => (
                  <MenuItem key={r.id} item={r} update={update} />
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
