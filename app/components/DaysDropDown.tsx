import { FC } from "react";
import type { Day } from "@/types";
import days from "../constants/days";

type DaysDropDownProp = {
  initDay: Day;
  setDay: (day: Day) => void;
};

const DaysDropDown: FC<DaysDropDownProp> = ({ setDay, initDay }) => {
  return (
    <select
      className="rounded-md text-c5 bg-c2 py-1 px-2 hover:bg-c5 hover:text-c2 border-2 border-c3 cursor-pointer"
      value={initDay}
      onChange={(e) => {
        const newDay = e.target.value as Day;
        if (newDay !== initDay) {
          setDay(newDay);
        }
      }}
    >
      {days.map((day, i) => (
        <option key={day + i} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};

export default DaysDropDown;
