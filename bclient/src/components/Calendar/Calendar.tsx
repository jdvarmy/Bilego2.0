import React, { useState } from 'react';
import { ArrowCircleDownIcon } from '@heroicons/react/solid';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { calendarSelector } from '../../store/selectors';
import { getWeek } from '../../utils/functions';
import Week from './Week';
import Month from './Month';
import Weekends from './Weekends';

const Calendar = () => {
  const { startDate, endDate } = useTypeSelector(calendarSelector);

  const [day, setDay] = useState<Date | number>(startDate);
  const [week, setWeek] = useState<Date[]>(() => getWeek(startDate));

  return (
    <div className='pt-7 px-2 -mx-2'>
      <div className='text-turquoise'>
        календарь <ArrowCircleDownIcon className='h-5 w-5 stroke-1 inline-block text-raspberry cursor-pointer' />
      </div>
      <Month date={day} setDay={setDay} setWeek={setWeek} />
      <Week week={week} startDate={startDate} endDate={endDate} />
      <Weekends setDay={setDay} setWeek={setWeek} />
    </div>
  );
};

export default Calendar;
