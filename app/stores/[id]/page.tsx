'use client';
import React, { useEffect, useState } from 'react';
import * as stores from '@/app/db/stores';
import Category from './Category';
import { Store, StorePrisma } from '@/types';
import handleMove from '../moveItems';
import EditButton from '@/app/components/EditButton';

type Props = { params: { id: string } };
const StoreComponent = ({ params: { id } }: Props) => {
  const [store, setStore] = useState<Store>();
  const [edited, setEdited] = useState(false);
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    stores.get(id).then(s => {
      setStore(s);
      setName(s.name);
    });
  }, [id]);

  const handleClick = (direction: 'up' | 'down', index: number) => {
    if (store) {
      const newOrder = handleMove(direction, index, store!.categories);
      setStore({ ...store, categories: newOrder });
      setEdited(true);
    } else {
      throw new Error('No store');
    }
  };

  const handleSave = async (name?: string) => {
    if (store) {
      const newOrder = store.categories.flatMap(c => c.order.map(i => i.id));
      const editedStore: StorePrisma = {
        id: store.id,
        name: name || store.name,
        order: newOrder,
      };
      await stores.upsert(editedStore);
      setEdited(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSave(name);
    setEditName(false);
  };
  return (
    <main>
      <div className="flex items-center gap-5">
        {!editName && (
          <h1 className="text-2xl font-bold m-2">{name || 'loading'}</h1>
        )}

        {editName && (
          <form onSubmit={handleSubmit} className="text-2xl font-bold m-2">
            <input value={name} onChange={e => setName(e.target.value)}></input>
          </form>
        )}
        <EditButton callback={() => setEditName(!editName)} />
        {edited && <button onClick={() => handleSave()}>Spara</button>}
      </div>
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
              editedSub={() => setEdited(true)}
            />
          ))}
      </ul>
    </main>
  );
};

export default StoreComponent;
