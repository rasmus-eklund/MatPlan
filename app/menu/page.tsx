'use client';
import { getMenuItems } from '../db/prisma';
import { Recipe, MenuItem as MenuItemType } from '@/types';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';

type Props = {};

const Menu = (props: Props) => {
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  useEffect(() => {
    getMenuItems().then(data => setMenu(data));
  }, []);
  const update = async () => {
    const items = await getMenuItems();
    setMenu(items);
  };
  const days = [
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag',
    'Söndag',
  ];
  return (
    <>
      <ul>
        {days.map(day => (
          <li key={day}>
            <h2>{day}</h2>
            <ul>
              {menu
                .filter(r => r.day === day)
                .map(r => (
                    <MenuItem key={r.id} recipe={r.recipe} callback={() => update()} />
                ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* <ul>
        {menu.map(r => (
          <MenuItem recipe={r.recipe} key={r.id} />
        ))}
      </ul> */}
    </>
  );
};

export default Menu;
