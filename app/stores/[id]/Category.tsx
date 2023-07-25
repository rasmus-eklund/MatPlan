import { CategoryItem } from '@/types';
import { useState } from 'react';
import Subcategory from './Subcategory';
import handleMove from '../moveItems';

type Props = {
  category: CategoryItem;
  index: number;
  clicked: (direction: 'up' | 'down', index: number) => void;
};

const Category = ({ category: { category, order }, index, clicked }: Props) => {
  const [subOrder, setSubOrder] = useState(order);
  const [open, setOpen] = useState(false);
  const [move, setMove] = useState(false);
  const handleClick = (direction: 'up' | 'down', index: number) => {
    const newOrder = handleMove(direction, index, subOrder);
    setSubOrder(newOrder);
  };
  return (
    <li className="border-2 border-blue-300 rounded-xl">
      <div className="flex gap-5 items-center">
        <h2
          onClick={() => setMove(!move)}
          className="text-xl flex-grow font-bold ml-4"
        >
          {category}
        </h2>
        {move && (
          <>
            <button onClick={() => clicked('up', index)}>upp</button>
            <button onClick={() => clicked('down', index)}>ned</button>
          </>
        )}
        <button
          className="flex justify-center items-center rounded-full w-10 h-10 border-2 border-blue-500 m-2 mr-4"
          onClick={() => setOpen(!open)}
        >
          +
        </button>
      </div>
      <ul>
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
