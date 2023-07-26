"use client";
import { MenuItem } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import {
  changeRecipeDay,
  removeRecipeFromMenu,
  updateMenuPortions,
} from "../db/prisma";
import DeleteButton from "../components/DeleteButton";
import DaysDropDownForMenu from "../components/DaysDropDownForMenu";

type Props = {
  item: MenuItem;
  callback: () => Promise<void>;
};

const MenuItem = ({ item, callback }: Props) => {
  const [portionsState, setPortionsState] = useState(item.portions);
  const [day, setDay] = useState(item.day);

  const handleRemove = async (id: string) => {
    await removeRecipeFromMenu(id);
    await callback();
  };
  const handleMinus = () => {
    setPortionsState(portionsState === 1 ? 1 : portionsState - 1);
  };
  const handlePlus = () => {
    setPortionsState(portionsState + 1);
  };

  const handleUpdateDay = (newDay: string) => {
    setDay(newDay);
    console.log(day);
  };

  useEffect(() => {
    (async () => {
      await updateMenuPortions(item.id, portionsState);
    })();
  }, [portionsState, item]);

  useEffect(() => {
    (async () => {
      await changeRecipeDay(item.id, day);
      if (day !== item.day) {
        callback();
      }
    })();
  }, [day, item]);

  return (
    <li className="flex items-center justify-center flex-grow bg-4 rounded-lg p-2 gap-2">
      <p>{item.recipe.name}</p>
      <div className="flex content-between items-center gap-2">
        <button
          onClick={handleMinus}
          className="rounded-full bg-3 w-5 h-5 flex items-center justify-center"
        >
          -
        </button>
        <p>{portionsState}</p>
        <button
          onClick={handlePlus}
          className="rounded-full bg-3 w-5 h-5 flex items-center justify-center"
        >
          +
        </button>
        <DaysDropDownForMenu initDay={item.day} callback={handleUpdateDay} />
        <DeleteButton
          callback={() => {
            handleRemove(item.id);
          }}
        />
      </div>
    </li>
  );
};

export default MenuItem;
