'use client';
import { StorePrisma } from '@/types';
import React, { useEffect, useState } from 'react';
import * as stores from '../db/stores';
import StoreComponent from '../components/storeComponent';

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
    <main className="bg-2 min-h-screen flex flex-col p-5 gap-4">
      <div className='bg-3 h-fit p-5 rounded-md flex flex-col gap-4'>
        <h2 className='text-1 font-bold text-2xl'>Lägg till affär</h2>
        <form onSubmit={handleSubmit}>
          <input
            className='p-1 bg-5 rounded-md'
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Affärens namn...'
          />
        </form>
      </div>
      <ul className='bg-3 rounded-md flex flex-col gap-2 h-fit p-5'>
        {storesState.map(s => (
          <StoreComponent key={s.id} store={s} callback={handleRemove} />
        ))}
      </ul>
    </main>
  );
};

export default Stores;
