'use client';
import React, { useEffect, useState } from 'react';
import * as stores from '@/app/db/stores';
import Category from './Category';
import { Store } from '@/types';
import handleMove from '../moveItems';

type Props = { params: { id: string } };
const StoreComponent = ({ params: { id } }: Props) => {
  const [store, setStore] = useState<Store>();

  useEffect(() => {
    stores.get(id).then(s => {
      setStore(s);
    });
  }, [id]);

  const handleClick = (direction: 'up' | 'down', index: number) => {
    if (store) {
      const newOrder = handleMove(direction, index, store!.categories);
      setStore({ ...store, categories: newOrder });
    } else {
      throw new Error('No store');
    }
  };

  return (
    <main>
      <h1 className="text-2xl font-bold m-2">{store?.name || 'loading'}</h1>
      <ul className="flex flex-col p-1 gap-1">
        {store &&
          store.categories.map((s, index) => (
            <Category
              key={s.category}
              category={s}
              index={index}
              clicked={(direction: 'up' | 'down', index: number) =>
                handleClick(direction, index)
              }
            />
          ))}
      </ul>
    </main>
  );
};

export default StoreComponent;
