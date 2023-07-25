import { CategoryItem } from '@/types';
import { useState } from 'react';
import Subcategory from './Subcategory';

type Props = {
  category: CategoryItem;
};

const Category = ({ category: { category, order } }: Props) => {
  const [subOrder, setSubOrder] = useState(order);
  const [open, setOpen] = useState(false);
  return (
    <li className='border-2 border-blue-500'>
      <div className="flex gap-5 items-center">
        <h2 className="text-2xl underline flex-grow">{category}</h2>
        <button
          className="flex justify-center items-center rounded-full w-8 h-8 border-2 border-black"
          onClick={() => setOpen(!open)}
        >
          +
        </button>
      </div>
      <ul>{open && order.map(i => <Subcategory key={i.id} items={i} />)}</ul>
    </li>
  );
};

export default Category;
