"use client";
import { getMenuItems } from "../db/menu";
import { MenuItem as MenuItemType } from "@/types";
import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import days from "../db/constants/days";

const Menu = () => {
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  useEffect(() => {
    getMenuItems().then((data) => setMenu(data));
  }, []);

  const update = async () => {
    const items = await getMenuItems();
    setMenu(items);
  };

  return (
    <>
      <main className="bg-2 p-6 min-h-screen">
        <ul className=" flex flex-col gap-2">
          {days.map((day) => (
            <li key={day} className="bg-3 p-2 rounded-md flex flex-col">
              <h2 className="text-3xl text-1 font-bold p-2 rounded-md">
                {day}
              </h2>
              <ul className="flex flex-col gap-2">
                {menu
                  .filter((r) => r.day === day)
                  .map((r) => (
                    <MenuItem key={r.id} item={r} callback={() => update()} />
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Menu;
