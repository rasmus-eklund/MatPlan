'use client';
import { getMenuItems } from '../db/prisma';
import { MenuItem as MenuItemType } from '@/types';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import days from '../db/days';

const Menu = () => {
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  useEffect(() => {
    getMenuItems().then(data => setMenu(data));
  }, []);
  const update = async () => {
    const items = await getMenuItems();
    setMenu(items);
  };

  return (
    <ul>
      {days.map(day => (
        <li key={day}>
          <h2>{day}</h2>
          <ul>
            {menu
              .filter(r => r.day === day)
              .map(r => (
                <MenuItem key={r.id} item={r} callback={() => update()} />
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
