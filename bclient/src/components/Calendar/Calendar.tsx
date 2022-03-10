import React, { useState } from 'react';
import { ArrowCircleDownIcon } from '@heroicons/react/outline';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { calendarSelector } from '../../store/selectors';
import Week from './Week';
import Month from './Month';
import { getWeek } from '../../utils/functions';

const Calendar = () => {
  const { selectedDate } = useTypeSelector(calendarSelector);

  const [day, setDay] = useState(selectedDate);
  const [week, setWeek] = useState<Date[]>(() => getWeek(selectedDate));

  return (
    <div className='pb-2 px-1 -mx-1'>
      <div className='text-xl text-my-turquoise'>
        календарь <ArrowCircleDownIcon className='h-5 w-5 inline-block text-my-raspberry cursor-pointer' />
      </div>
      <Month date={day} setDay={setDay} setWeek={setWeek} />
      <Week week={week} selectedDate={selectedDate} />
    </div>
  );
};

export default Calendar;
