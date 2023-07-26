'use client';
import { StorePrisma } from '@/types';
import React, { useEffect, useState } from 'react';
import * as stores from '../db/stores';
import StoreComponent from './storeComponent';

const Stores = () => {
  const [storesState, setStoresState] = useState<StorePrisma[]>([]);
  const [name, setName] = useState('');
  useEffect(() => {
    stores.getAll().then(s => setStoresState(s));
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await stores.addDefault(name);
    await update();
    setName('');
  };
  const handleRemove = async (id: string) => {
    await stores.remove(id);
    await update();
  };
  const update = async () => {
    setStoresState(await stores.getAll());
  };
  return (
    <>
      <div>Affärer</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form>
      <ul>
        {storesState.map(s => (
          <StoreComponent key={s.id} store={s} callback={handleRemove} />
        ))}
      </ul>
    </>
  );
};

export default Stores;
