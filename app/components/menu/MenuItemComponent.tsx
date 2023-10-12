"use client";
import { MenuItem } from "@/types";
import Link from "next/link";
import DeleteButton from "../buttons/DeleteButton";
import DaysDropDown from "../DaysDropDown";
import Incrementer from "./Incrementer";
import { FC } from "react";

type MenuItemProps = {
  item: MenuItem;
  changePortions: (item: MenuItem) => void;
  changeDay: (item: MenuItem) => void;
  removeItem: (item: MenuItem) => void;
};

const MenuItem: FC<MenuItemProps> = ({
  item,
  changeDay,
  changePortions,
  removeItem,
}) => {
  const { id, name, day } = item;
  return (
    <li className="flex flex-col md:flex-row items-center justify-between bg-4 rounded-md px-2 gap-2 font-bold text-1">
      <Link href={`/menu/${id}`} className="text-lg self-start md:self-center">
        {name}
      </Link>
      <div className="flex items-center gap-1">
        <Incrementer
          value={item.portions}
          callback={(value) => changePortions({ ...item, portions: value })}
        />
        <DaysDropDown
          initDay={day}
          setDay={(newDay) => changeDay({ ...item, day: newDay })}
        />
        <DeleteButton callback={() => removeItem(item)} />
      </div>
    </li>
  );
};

export default MenuItem;
