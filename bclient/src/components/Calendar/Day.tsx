import React, { useCallback, useMemo, useState } from 'react';
import { isBefore, isEqual, isWeekend } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../../store/calendar/calendarSlice';
import css from './Calendar.module.css';

type Props = {
  day: Date;
  selectedDate: Date;
  dayOfWeek: string;
  isHover: boolean;
  setIsHover: (flag: boolean) => void;
};

const Day = ({ day, selectedDate, dayOfWeek, isHover, setIsHover }: Props) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const isSelectedDay: boolean = useMemo(
    () =>
      isEqual(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()),
        new Date(day.getFullYear(), day.getMonth(), day.getDate()),
      ),
    [day, selectedDate],
  );

  const handleOver = useCallback(() => {
    setActive(true);
    setIsHover(true);
  }, [setIsHover]);
  const handleLeave = useCallback(() => {
    setActive(false);
    setIsHover(false);
  }, [setIsHover]);
  const handleClick = useCallback(() => {
    const today = new Date();
    if (isBefore(day, new Date(today.getFullYear(), today.getMonth(), today.getDate()))) {
      return undefined;
    }

    dispatch(setSelectedDate(day));
  }, [day, dispatch]);

  return (
    <div
      onMouseOver={handleOver}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className={`${css.Day} ${
        (isHover ? active : isSelectedDay) && css.Active
      } flex flex-col items-center cursor-pointer relative w-8 select-none`}
    >
      <div className='font-light text-my-purple select-none'>{dayOfWeek}</div>
      <div className={`${isWeekend(day) && 'text-my-raspberry select-none'}`}>{day.getDate()}</div>
    </div>
  );
};

export default Day;
