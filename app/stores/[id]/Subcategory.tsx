import { SubcategoryItem } from '@/types';
import { useState } from 'react';
import DownArrow from '@/app/components/DownArrow';
import UpArrow from '@/app/components/UppArrow';

type Props = {
  items: SubcategoryItem;
  index: number;
  clicked: (direction: 'up' | 'down', index: number) => void;
};

const Subcategory = ({
  items: { category, id, subcategory },
  index,
  clicked,
}: Props) => {
  const [move, setMove] = useState(false);
  const toggle = () => {
    setMove(!move);
  };
  return (
    <li className="flex justify-between rounded-md font-semibold bg-3 px-2 py-1">
      <p
        className="text-1 hover:cursor-pointer select-none"
        onClick={toggle}
      >
        {subcategory}
      </p>
      {move && (
        <div className="flex gap-1">
          <DownArrow bg={2} callback={() => clicked('down', index)} />
          <UpArrow bg={2} callback={() => clicked('up', index)} />
        </div>
      )}
    </li>
  );
};

export default Subcategory;
