"use client";
import {
  changeMenuItemDay,
  changeMenuItemPortions,
  getMenuItems,
  removeMenuItem,
} from "../server-side/menu";
import { MenuItem } from "@/types";
import {
  useEffect,
  useState,
  experimental_useOptimistic as useOptimistic,
} from "react";
import days from "../constants/days";
import { SortMenuItems, Optimistic } from "../utils/utils";
import MenuItemComponent from "../components/menu/MenuItemComponent";

const Menu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [optMenu, setOptMenu] = useOptimistic(menu);
  const opti = Optimistic({ setItems: setMenu, setOpt: setOptMenu });

  useEffect(() => {
    getMenuItems().then((data) => setMenu(data));
  }, []);

  return (
    <>
      <main className="flex flex-col bg-2 p-6 grow overflow-y-auto">
        <ul className=" flex flex-col gap-2">
          {days.map((day) => (
            <li key={day} className="bg-3 p-2 rounded-md flex flex-col">
              <h2 className="text-3xl text-1 font-bold p-2 rounded-md">
                {day}
              </h2>
              <ul className="flex flex-col gap-2">
                {SortMenuItems(optMenu, day).map((item) => (
                  <MenuItemComponent
                    key={item.id}
                    item={item}
                    changeDay={(item) =>
                      opti.update({ item, cb: changeMenuItemDay })
                    }
                    changePortions={(item) =>
                      opti.update({ item, cb: changeMenuItemPortions })
                    }
                    removeItem={(item) =>
                      opti.remove({ item, cb: removeMenuItem })
                    }
                  />
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
