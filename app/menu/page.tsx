"use client";
import { getMenuItems } from "../db/prisma";
import { MenuItem as MenuItemType } from "@/types";
import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import days from "../db/days";

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
        <ul className=" flex flex-col gap-3">
          {days.map((day) => (
            <li key={day} className="bg-3 p-4 m-2 rounded-md flex">
              <h2 className="text-3xl text-1 font-bold p-2 rounded-md w-1/6 text-left">
                {day}
              </h2>
              <ul className="flex flex-col gap-2 w-5/6">
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
