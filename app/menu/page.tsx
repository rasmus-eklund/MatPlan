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
    <>
    <main className='bg-2 p-4'>
      <h2 className='text-5 text-3xl'>Weekly menu</h2>
      <ul>
        {days.map(day => (
     
          <li key={day} className='bg-3 p-4 m-2 rounded-md'  >
            <h2 className='text-center text-2xl text-1 font-bold p-2 rounded-md'>{day}</h2>
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
      </main>
    </>
  );
};

export default Menu;
