import { FC, useState } from 'react';
import type { Day } from '@/types';
import days from '../constants/days';

type DaysDropDownProp = {
  initDay: Day;
  setDay: (day: Day) => void;
};

const DaysDropDown: FC<DaysDropDownProp> = ({ setDay, initDay }) => {
  return (
    <select
      className="rounded-md text-1 bg-4 py-1 px-2 hover:bg-1 hover:text-4 border-[2px] border-3 cursor-pointer"
      value={initDay}
      onChange={e => {
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
