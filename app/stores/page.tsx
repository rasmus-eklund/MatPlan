'use client';
import { Store } from '@/types';
import React, { useEffect, useState } from 'react';
import { getAllStores, addDefaultStore, removeStore } from '../db/stores';
import StoreComponent from '../components/StoreItem';
import PlusIcon from '../components/icons/PlusIcon';

const Stores = () => {
  const [stores, setStores] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    getAllStores().then((s: { name: string; id: string }[]) => setStores(s));
  }, []);

  const handleRemove = async (id: string) => {
    await removeStore(id);
    setStores(prev => prev.filter(i => i.id !== id));
    if (stores.length === 0) {
      const res = await getAllStores();
      setStores(res);
    }
  };

  const handleAddStore = async () => {
    await addDefaultStore();
    setStores(await getAllStores());
  };

  return (
    <main className="bg-2 flex flex-col p-5 gap-4 grow overflow-y-auto">
      <ul className="bg-3 rounded-md flex flex-col gap-2 h-fit p-5">
        {stores.map(s => (
          <StoreComponent key={s.id} store={s} callback={handleRemove} />
        ))}
        <li
          onClick={handleAddStore}
          className="bg-4 p-2 h-10 rounded-md flex gap-2 items-center text-2 text-xl hover:bg-2 hover:text-1 group cursor-pointer"
        >
          <PlusIcon className="h-6 w-6 fill-2 group-hover:fill-3" />
          <p>Lägg till ny affär</p>
        </li>
      </ul>
    </main>
  );
};

export default Stores;
