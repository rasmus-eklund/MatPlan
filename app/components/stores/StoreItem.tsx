import Link from "next/link";
import React, { FC } from "react";
import DeleteButton from "../buttons/DeleteButton";

type StoreItemProps = {
  callback: (id: string) => void;
  store: {
    id: string;
    name: string;
  };
};

const StoreItem: FC<StoreItemProps> = ({ store: { id, name }, callback }) => {
  return (
    <li className="bg-c2 p-2 rounded-md flex justify-between items-center h-10">
      <Link className="text-c5 text-xl hover:text-c3" href={`/stores/${id}`}>
        {name}
      </Link>
      <DeleteButton callback={() => callback(id)} />
    </li>
  );
};

export default StoreItem;
