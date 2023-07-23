'use client';
import { Recipe } from '@/types';
import React from 'react';
import { removeRecipeFromMenu } from '../db/prisma';
import DeleteButton from '../components/DeleteButton';

type Props = {
  recipe: Recipe;
  callback: () => Promise<void>;
};

const MenuItem = ({ recipe, callback }: Props) => {
  const handleRemove = async (id: string) => {
    await removeRecipeFromMenu(id);
    await callback();
  };
  return (
    <li className="flex align-middle border-2 border-gray-400 p-2">
      <p>{recipe.name}</p>
      <div className="flex content-between">
        <button className="rounded-full bg-red-300 w-5 h-5 align-middle">
          -
        </button>
        <p>{recipe.portions}</p>
        <button className="rounded-full bg-green-300 w-5 h-5 align-middle">
          +
        </button>
        <DeleteButton callback={() => {handleRemove(recipe.id)}}/>
      </div>
    </li>
  );
};

export default MenuItem;
