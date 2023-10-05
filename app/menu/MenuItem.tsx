'use client';
import { MenuItem } from '@/types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import {
  changeRecipeDay,
  removeRecipeFromMenu,
  updateMenuPortions,
} from '../db/menu';
import DeleteButton from '../components/buttons/Delete';
import DaysDropDownForMenu from '../components/DaysDropDownForMenu';

type Props = {
  item: MenuItem;
  callback: () => Promise<void>;
};

const MenuItem = ({ item, callback }: Props) => {
  const [portionsState, setPortionsState] = useState(item.portions);
  const [day, setDay] = useState(item.day);

  const handleRemove = async (id: string) => {
    await removeRecipeFromMenu(id);
    await callback();
  };
  const handleMinus = () => {
    setPortionsState(portionsState === 1 ? 1 : portionsState - 1);
  };
  const handlePlus = () => {
    setPortionsState(portionsState + 1);
  };

  const handleUpdateDay = (newDay: string) => {
    setDay(newDay);
  };

  useEffect(() => {
    (async () => {
      await updateMenuPortions(item.id, portionsState);
    })();
  }, [portionsState, item]);

  useEffect(() => {
    (async () => {
      await changeRecipeDay(item.id, day);
      if (day !== item.day) {
        callback();
      }
    })();
  }, [day, item]);

  return (
    <li className="flex items-center justify-between bg-4 rounded-md px-2 gap-2 font-bold text-1">
      <Link href={`/recipes/${item.recipeId}`} className="text-lg">{item.recipe.name}</Link>
      <div className="flex content-between items-center py-2 gap-1">
        <button onClick={handleMinus} className="rounded-full bg-3 w-6 h-6">
          -
        </button>
        <p className="text-lg">{portionsState}</p>
        <button onClick={handlePlus} className="rounded-full bg-3 w-6 h-6">
          +
        </button>
        <DaysDropDownForMenu initDay={item.day} callback={handleUpdateDay} />
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
