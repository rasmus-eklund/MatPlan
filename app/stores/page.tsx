"use client";
import { useEffect, useState } from "react";
import {
  getAllStores,
  addDefaultStore,
  removeStore,
} from "../server-side/stores";
import StoreComponent from "../components/stores/StoreItem";
import PlusIcon from "../components/icons/PlusIcon";

const Stores = () => {
  const [stores, setStores] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    getAllStores().then((s: { name: string; id: string }[]) => setStores(s));
  }, []);

  const handleRemove = async (id: string) => {
    await removeStore(id);
    setStores((prev) => prev.filter((i) => i.id !== id));
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
    <div className="bg-c3 rounded-md flex flex-col gap-2 p-3">
      <h2 className="text-xl text-c5">Butiker</h2>
      <ul className="flex flex-col gap-2">
        {stores.map((s) => (
          <StoreComponent key={s.id} store={s} callback={handleRemove} />
        ))}
        <li
          onClick={handleAddStore}
          className="bg-c2 p-2 h-10 rounded-md flex gap-2 items-center text-c4 text-xl hover:bg-c4 hover:text-c5 group cursor-pointer"
        >
          <PlusIcon className="h-6 w-6 fill-2 group-hover:fill-3" />
          <p>Lägg till ny affär</p>
        </li>
      </ul>
    </div>
  );
};

export default Stores;
