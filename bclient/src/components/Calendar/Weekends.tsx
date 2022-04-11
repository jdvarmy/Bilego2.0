import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { isSaturday, isSunday, addDays, nextSaturday, nextSunday } from 'date-fns';
import { setEndDate, setOneDayDate, setStartDate } from '../../store/calendar/calendarSlice';
import { getWeek } from '../../utils/functions';

type Props = {
  setDay: (date: Date | number) => void;
  setWeek: (dates: Date[]) => void;
};

const Weekends = ({ setDay, setWeek }: Props) => {
  const dispatch = useDispatch();

  const clickTodayHandler = () => {
    const date = new Date();
    dispatch(setOneDayDate(date));

    setDay(date);
    setWeek(getWeek(date));
  };
  const clickWeekendHandler = () => {
    const date = new Date();

    if (isSaturday(date)) {
      dispatch(setStartDate(date));
      dispatch(setEndDate(addDays(date, 1)));
    } else if (isSunday(date)) {
      dispatch(setOneDayDate(date));
    } else {
      dispatch(setStartDate(nextSaturday(date)));
      dispatch(setEndDate(nextSunday(date)));
    }

    setDay(date);
    setWeek(getWeek(date));
  };
  return (
    <div className='flex flex-row justify-between text-xs'>
      <div
        className='text-xs mt-6 border rounded-2xl border-chrome text-center pb-0.5 px-3 text-chrome cursor-pointer'
        onClick={clickTodayHandler}
      >
        сегодня
      </div>
      <div
        className='text-xs mt-6 border rounded-2xl border-chrome text-center pb-0.5 px-3 text-chrome cursor-pointer'
        onClick={clickWeekendHandler}
      >
        выходные
      </div>
    </div>
  );
};

export default Weekends;
