'use client';
import React, { useEffect, useState } from 'react';
import * as stores from '@/app/db/stores';
import Category from './Category';
import { Store, StorePrisma } from '@/types';
import handleMove from '../moveItems';
import EditButton from '@/app/components/buttons/Edit';
import SaveButton from '@/app/components/buttons/Save';

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
    <main className="bg-2 p-5 min-h-screen">
      <div className="bg-3 rounded-md p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {!editName && (
            <h2 className="text-1 text-2xl font-bold">{name || 'loading'}</h2>
          )}
          {editName && (
            <form onSubmit={handleSubmit} className="text-2xl font-bold">
              <input
                className="bg-4 rounded-md"
                value={name}
                onChange={e => setName(e.target.value)}
              ></input>
            </form>
          )}
          <div className="flex gap-2">
            <EditButton callback={() => setEditName(!editName)} />
            {edited && <SaveButton callback={() => handleSave()} />}
          </div>
        </div>
        <ul className="flex flex-col gap-2 bg-3 rounded-md">
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
      </div>
    </main>
  );
};

export default StoreComponent;
