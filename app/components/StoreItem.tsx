import Link from 'next/link';
import React, { FC } from 'react';
import DeleteButton from './buttons/DeleteButton';

type StoreItemProps = {
  callback: (id: string) => void;
  store: {
    id: string;
    name: string;
  };
};

const StoreItem: FC<StoreItemProps> = ({ store: { id, name }, callback }) => {
  return (
    <li className="bg-4 p-2 rounded-md flex justify-between items-center h-10">
      <Link className="text-2 text-xl" href={`/stores/${id}`}>
        {name}
      </Link>
      <DeleteButton callback={() => callback(id)} />
    </li>
  );
};

export default StoreItem;
