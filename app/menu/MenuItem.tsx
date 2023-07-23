'use client';
import { MenuItem } from '@/types';
import React, { useEffect, useState } from 'react';
import { removeRecipeFromMenu, updateMenuPortions } from '../db/prisma';
import DeleteButton from '../components/DeleteButton';

type Props = {
  item: MenuItem;
  callback: () => Promise<void>;
};

const MenuItem = ({ item, callback }: Props) => {
  const [portionsState, setPortionsState] = useState(item.portions);
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
  useEffect(() => {
    (async () => {
      await updateMenuPortions(item.id, portionsState);
    })();
  }, [portionsState, item]);

  return (
    <li className="flex items-center border-2 border-gray-400 p-2 gap-2">
      <p>{item.recipe.name}</p>
      <div className="flex content-between items-center gap-2">
        <button
          onClick={handleMinus}
          className="rounded-full bg-red-300 w-5 h-5 flex items-center justify-center"
        >
          -
        </button>
        <p>{portionsState}</p>
        <button
          onClick={handlePlus}
          className="rounded-full bg-green-300 w-5 h-5 flex items-center justify-center"
        >
          +
        </button>
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
