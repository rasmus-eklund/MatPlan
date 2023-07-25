'use client';
import React, { useEffect, useState } from 'react';
import * as stores from '@/app/db/stores';
import Category from './Category';
import { Store } from '@/types';

type Props = { params: { id: string } };
const StoreComponent = ({ params: { id } }: Props) => {
  const [store, setStore] = useState<Store>();

  useEffect(() => {
    stores.get(id).then(s => {
      setStore(s);
    });
  }, [id]);

  return (
    <main>
      <h1 className="text-xl">{store?.name || 'loading'}</h1>
      <ul className='flex flex-col p-1 gap-2'>
        {store &&
          store.categories.map(s => <Category key={s.category} category={s} />)}
      </ul>
    </main>
  );
};

export default StoreComponent;
