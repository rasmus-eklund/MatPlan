import React, { useState } from 'react';
import days from '../db/days';
import { changeRecipeDay } from '../db/prisma';

type Props = {};

const DaysDropDownForMenu = ({ id, day }: { id: string; day: string }) => {
  const [dayState, setDayState] = useState(day);
  day;
  const handleChange = async (recipeId: string, day: string) => {
    await changeRecipeDay(recipeId, day);
  };
  return (
    <select
      className="border-2 p-1.5 px-4 rounded-md border-black m-4"
      name="day"
      id="day"
      value={day}
      onChange={async e => {
        setDayState(e.target.value);
        await handleChange(id, day);
      }}
    >
      {days.map(day => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};

export default DaysDropDownForMenu;
