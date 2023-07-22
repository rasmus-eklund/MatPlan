'use client';
import React, { useEffect, useState } from 'react';
import * as stores from '@/app/db/stores';
import { StoreCategory } from '@/types';
import Categories from './Categories';

type Props = { params: { id: string } };
const Store = ({ params: { id } }: Props) => {
  const [store, setStore] = useState<StoreCategory>();
  const [category, setCategory] = useState<String[]>([]);

  useEffect(() => {
    stores.get(id).then(s => {
      setStore(s);
    });
  }, [id]);

  const toCategories = (store: StoreCategory) =>
    store.order
      .map(i => i.category)
      .filter((item, i, ar) => ar.indexOf(item) === i);

  return (
    <main>
      <h1 className="text-xl">{store?.name}</h1>
      {store && (
        <ul className="border-2 border-red-500">
          {toCategories(store).map(cat => (
            <li className="border-2 border-blue-500 ps-3" key={cat}>
              <h2 className="text-2xl">{cat}</h2>
              <ul>
                {store.order
                  .filter(i => i.category === cat)
                  .map(({ name, category, id }) => (
                    <li key={`${id}_${category}`}>{name}</li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Store;
