'use client';
import { Day, MenuItem } from '@/types';
import Link from 'next/link';
import {
  changeRecipeDay,
  removeRecipeFromMenu,
  updateMenuPortions,
} from '../db/menu';
import DeleteButton from './buttons/Delete';
import DaysDropDown from './DaysDropDown';
import Incrementer from './Incrementer';

type Props = {
  item: MenuItem;
  callback: () => Promise<void>;
};

const MenuItem = ({ item, callback }: Props) => {
  const handleRemove = async (id: string) => {
    await removeRecipeFromMenu(id);
    await callback();
  };

  const handleChangeDay = (day: Day) => {
    if (day !== item.day) {
      changeRecipeDay(item.id, day);
    }
  };

  const handleChangePortions = async (portions: number) => {
    await updateMenuPortions(item.id, portions);
  };

  return (
    <li className="flex items-center justify-between bg-4 rounded-md px-2 gap-2 font-bold text-1">
      <Link
        href={`/menu/${item.recipeId}/${item.portions}`}
        className="text-lg"
      >
        {item.name}
      </Link>
      <div className='flex items-center'>
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
