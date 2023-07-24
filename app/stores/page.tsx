'use client';
import { StorePrisma } from '@/types';
import React, { useEffect, useState } from 'react';
import * as stores from '../db/stores';
import Link from 'next/link';

const Stores = () => {
  const [storesState, setStoresState] = useState<StorePrisma[]>([]);
  const [name, setName] = useState('');
  useEffect(() => {
    stores.getAll().then(s => setStoresState(s));
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await stores.addDefault(name);
    setStoresState(await stores.getAll());
  };
  return (
    <>
      <div>Stores</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form>
      <ul>
        {storesState.map(s => (
          <li key={s.id}>
            <Link href={`/stores/${s.id}`}>{s.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Stores;
