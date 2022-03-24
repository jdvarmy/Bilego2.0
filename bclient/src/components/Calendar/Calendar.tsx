import React, { useState } from 'react';
import { ArrowCircleDownIcon } from '@heroicons/react/outline';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { calendarSelector } from '../../store/selectors';
import { getWeek } from '../../utils/functions';
import Week from './Week';
import Month from './Month';
import Weekends from './Weekends';

const Calendar = () => {
  const { startDate, endDate } = useTypeSelector(calendarSelector);

  const [day, setDay] = useState(startDate);
  const [week, setWeek] = useState<Date[]>(() => getWeek(startDate));

  return (
    <div className='pb-2 px-1 -mx-1'>
      <div className='text-xl text-my-turquoise'>
        календарь <ArrowCircleDownIcon className='h-5 w-5 stroke-1 inline-block text-my-raspberry cursor-pointer' />
      </div>
      <Month date={day} setDay={setDay} setWeek={setWeek} />
      <Week week={week} startDate={startDate} endDate={endDate} />
      <Weekends />
    </div>
  );
};

export default Calendar;
