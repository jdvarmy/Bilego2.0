import React, { useState } from 'react';
import { getDay, isBefore } from 'date-fns';
import Day from './Day';
import css from './Calendar.module.css';

type Props = {
  week: Date[];
  selectedDate: Date | number;
};

const weekNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

const Week = ({ week, selectedDate }: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div className='flex flex-row overflow-hidden justify-between -m-3 p-1 relative'>
      {week.map((item) => {
        return (
          <Day
            key={item.toDateString()}
            day={item}
            selectedDate={new Date(selectedDate)}
            dayOfWeek={weekNames[getDay(item)]}
            isHover={isHover}
            setIsHover={setIsHover}
          />
        );
      })}
      {<div className={`${css.Indicator} ${isBefore(week[0], selectedDate) ? css.After : css.Before}`} />}
    </div>
  );
};

export default Week;
