import React, { useState } from "react";
import days from "../db/days";
import { changeRecipeDay } from "../db/prisma";

type Prop = {
  callback: (day: string) => void;
  initDay: string;
};

const DaysDropDownForMenu = ({ callback, initDay }: Prop) => {
  const [day, setDay] = useState(initDay);
  // const handleChange = async (recipeId: string, day: string) => {
  //   await changeRecipeDay(recipeId, day);
  // };
  return (
    <select
      className="border-2 p-1.5 px-4 rounded-md border-black m-4"
      name="day"
      id="day"
      value={day}
      onChange={(e) => {
        setDay(e.target.value);
        callback(e.target.value);
      }}
    >
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};

export default DaysDropDownForMenu;
