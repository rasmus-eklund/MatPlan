import Link from 'next/link';
import React from 'react';
import DeleteButton from '../components/DeleteButton';

type Props = {
  callback: (id: string) => void;
  store: {
    id: string;
    name: string;
  };
};

const StoreComponent = ({ store: { id, name }, callback }: Props) => {
  return (
    <li>
      <Link href={`/stores/${id}`}>{name}</Link>
      <DeleteButton callback={() => callback(id)} />
    </li>
  );
};

export default StoreComponent;
