import { CategoryItem } from '@/types';
import { useState } from 'react';
import Subcategory from './Subcategory';
import handleMove from '../moveItems';
import UppArrow from '@/app/components/UppArrow';
import DownArrow from '@/app/components/DownArrow';

type Props = {
  category: CategoryItem;
  index: number;
  clicked: (direction: 'up' | 'down', index: number) => void;
  editedSub: () => void;
};

const Category = ({
  category: { category, order },
  index,
  clicked,
  editedSub,
}: Props) => {
  const [subOrder, setSubOrder] = useState(order);
  const [open, setOpen] = useState(false);
  const [move, setMove] = useState(false);
  const handleClick = (direction: 'up' | 'down', index: number) => {
    const newOrder = handleMove(direction, index, subOrder);
    setSubOrder(newOrder);
    editedSub();
  };
  return (
    <li className="rounded-md bg-2 px-2 py-1">
      <div className="flex justify-between items-center p-1">
        <h3
          onClick={() => setMove(!move)}
          className="text-xl font-bold text-4 hover:cursor-pointer select-none"
        >
          {category}
        </h3>
        <div className="flex gap-3">
          {move && (
            <>
              <UppArrow bg={2} callback={() => clicked('up', index)} />
              <DownArrow bg={2} callback={() => clicked('down', index)} />
            </>
          )}
          <button
            className="text-2 font-bold flex justify-center items-center rounded-full w-8 h-8 bg-3"
            onClick={() => setOpen(!open)}
          >
            +
          </button>
        </div>
      </div>
      <ul className="flex flex-col gap-1">
        {open &&
          subOrder.map((subCat, index) => (
            <Subcategory
              key={subCat.id}
              index={index}
              items={subCat}
              clicked={(direction, index) => handleClick(direction, index)}
            />
          ))}
      </ul>
    </li>
  );
};

export default Category;
