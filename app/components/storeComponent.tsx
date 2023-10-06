import Link from 'next/link';
import React from 'react';
import DeleteButton from './buttons/Delete';

type Props = {
  callback: (id: string) => void;
  store: {
    id: string;
    name: string;
  };
};

const StoreComponent = ({ store: { id, name }, callback }: Props) => {
  return (
    <li className="bg-4 p-2 rounded-md flex justify-between">
      <p className='text-2 text-xl'>
        <Link href={`/stores/${id}`}>{name}</Link>
      </p>
      <div>
        <DeleteButton callback={() => callback(id)} />
      </div>
    </li>
  );
};

export default StoreComponent;
