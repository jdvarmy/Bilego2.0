import React, { useCallback } from 'react';
import { LightBulbIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { isSaturday, isSunday, addDays, nextSaturday, nextSunday } from 'date-fns';
import { setEndDate, setOneDayDate, setStartDate } from '../../store/calendar/calendarSlice';

const Weekends = () => {
  const dispatch = useDispatch();

  const clickHandler = useCallback(() => {
    const date = new Date();

    console.log(nextSaturday(date));

    if (isSaturday(date)) {
      dispatch(setStartDate(date));
      dispatch(setEndDate(addDays(date, 1)));
    } else if (isSunday(date)) {
      dispatch(setOneDayDate(date));
    } else {
      dispatch(setStartDate(nextSaturday(date)));
      dispatch(setEndDate(nextSunday(date)));
    }
  }, [dispatch]);
  return (
    <div
      className='mt-6 border rounded-2xl border-my-chrome text-center pt-0.5 pb-1 text-my-chrome cursor-pointer'
      onClick={clickHandler}
    >
      <LightBulbIcon className='h-5 w-4 inline-block text-my-chrome mr-1.5' />
      <span>GO на выходные</span>
    </div>
  );
};

export default Weekends;
