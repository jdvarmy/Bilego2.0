import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { getWeek } from '../../utils/functions';
import { addWeeks, endOfWeek, isBefore, startOfWeek, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import { transitionTimingFunction } from '../../types/types';

type Props = {
  date: Date | number;
  setDay: (date: Date) => void;
  setWeek: (dates: Date[]) => void;
};

const months = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];
const timeout = 0;

const RenderMonths = ({ date, month, index }: { date: Date | number; month: string; index: number }) => {
  const startWeek = startOfWeek(date, { locale: ru }).getMonth();
  const endWeek = endOfWeek(date, { locale: ru }).getMonth();
  const inMonth = startWeek === index;
  const inNextMonth = endWeek === index + 1 && inMonth;

  return (
    <div className='h-5 absolute' key={month}>
      <Transition
        show={inMonth}
        as={Fragment}
        enter={`transition ${transitionTimingFunction} duration-500`}
        enterFrom='opacity-0 scale-75 translate-x-full'
        enterTo='opacity-100 scale-100 translate-x-0'
        leave={`transition ${transitionTimingFunction} duration-500`}
        leaveFrom='opacity-100 scale-100 translate-x-0'
        leaveTo='opacity-0 scale-75 -translate-x-full'
      >
        <div className={`text-chrome font-light inline-block pr-4 ${!inMonth && 'opacity-0'}`}>{month}</div>
      </Transition>
      <Transition
        show={inNextMonth}
        as={Fragment}
        enter={`transition ${transitionTimingFunction} duration-500`}
        enterFrom='opacity-0 scale-75 translate-x-full'
        enterTo='opacity-100 scale-100 translate-x-0'
        leave={`transition ${transitionTimingFunction} duration-500`}
        leaveFrom='opacity-100 scale-100 translate-x-0'
        leaveTo='opacity-0 scale-125 -translate-x-full'
      >
        <div className={`text-purple font-light inline-block ${!inNextMonth && 'opacity-0'}`}>{months[index + 1]}</div>
      </Transition>
    </div>
  );
};

const Month = ({ date, setDay, setWeek }: Props) => {
  const handlerClickForward = () => {
    const nextWeek = addWeeks(date, 1);
    setDay(nextWeek);
    setWeek(getWeek(nextWeek));
  };
  const handlerClickBack = () => {
    const nextWeek = subWeeks(date, 1);
    setDay(nextWeek);
    setWeek(getWeek(nextWeek));
  };

  return (
    <div className='flex justify-between items-center mt-3  text-xs'>
      <div className='w-36 h-5 relative select-none'>
        {months.map((month, key) => (
          <RenderMonths date={date} month={month} key={key} index={key} />
        ))}
      </div>
      <div>
        {isBefore(startOfWeek(new Date()), startOfWeek(date)) && (
          <ChevronLeftIcon className='h-6 w-6 inline-block text-turquoise cursor-pointer' onClick={handlerClickBack} />
        )}
        <ChevronRightIcon
          className='h-6 w-6 inline-block text-turquoise cursor-pointer'
          onClick={handlerClickForward}
        />
      </div>
    </div>
  );
};

export default Month;
