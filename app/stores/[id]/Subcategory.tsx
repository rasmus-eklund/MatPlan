import { SubcategoryItem } from '@/types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';

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
    <li className="flex gap-5 border-2 border-black rounded-3xl m-2 p-2 font-semibold mr-4 ml-4">
      <p className="ml-2 flex-grow " onClick={toggle}>
        {subcategory}
      </p>
      {move && (
        <div className="flex gap-1">
          <FontAwesomeIcon
            className={' hover:scale-110'}
            onClick={() => clicked('down', index)}
            icon={faCircleDown}
            size="xl"
            style={{ color: '#9db2bf' }}
          />
          <FontAwesomeIcon
            className={' hover:scale-110'}
            onClick={() => clicked('up', index)}
            icon={faCircleUp}
            size="xl"
            style={{ color: '#9db2bf' }}
          />
        </div>
      )}
    </li>
  );
};

export default Subcategory;
