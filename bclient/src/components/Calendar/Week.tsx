import React, { useState } from 'react';
import { getDay, isBefore, isEqual } from 'date-fns';
import Day from './Day';
import css from './Calendar.module.css';

type Props = {
  week: Date[];
  startDate: Date | number;
  endDate: Date | number;
};

const weekNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

const Week = ({ week, startDate, endDate }: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div className='flex flex-row overflow-hidden justify-between -m-3 p-1 relative'>
      {week.map((item) => {
        return (
          <Day
            key={item.toDateString()}
            day={item}
            selectedDate={new Date(startDate)}
            dayOfWeek={weekNames[getDay(item)]}
            isHover={isHover}
            setIsHover={setIsHover}
          />
        );
      })}
      {
        <div
          className={`${css.Indicator} ${!isEqual(startDate, endDate) && css.Weekend} ${
            isBefore(week[0], startDate) ? css.After : css.Before
          }`}
        />
      }
    </div>
  );
};

export default Week;
