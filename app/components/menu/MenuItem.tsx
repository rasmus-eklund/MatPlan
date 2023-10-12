'use client';
import { Day, MenuItem } from '@/types';
import Link from 'next/link';
import {
  changeRecipeDay,
  removeRecipeFromMenu,
  updateMenuPortions,
} from '../../db/menu';
import DeleteButton from '../buttons/DeleteButton';
import DaysDropDown from '../DaysDropDown';
import Incrementer from './Incrementer';
import { FC, useRef } from 'react';

type MenuItemProps = {
  item: MenuItem;
  update: () => Promise<void>;
};

const MenuItem: FC<MenuItemProps> = ({ item, update }) => {
  const portionsRef = useRef(item.portions);
  const handleRemove = async (id: string) => {
    await removeRecipeFromMenu(id);
    await update();
  };

  const handleChangeDay = (day: Day) => {
    if (day !== item.day) {
      changeRecipeDay(item.id, day).then(update);
    }
  };

  const handleChangePortions = async (portions: number) => {
    portionsRef.current = portions;
    await updateMenuPortions(item.id, portions);
  };

  return (
    <li className="flex flex-col md:flex-row items-center justify-between bg-4 rounded-md px-2 gap-2 font-bold text-1">
      <Link
        href={`/menu/${item.recipeId}/${portionsRef.current}`}
        className="text-lg self-start md:self-center"
      >
        {item.name}
      </Link>
      <div className="flex items-center gap-1">
        <Incrementer
          initialValue={item.portions}
          callback={handleChangePortions}
        />
        <DaysDropDown initDay={item.day} callback={handleChangeDay} />
        <DeleteButton
          callback={() => {
            handleRemove(item.id);
          }}
        />
      </div>
    </li>
  );
};

export default MenuItem;
