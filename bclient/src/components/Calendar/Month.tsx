import React from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/solid';
import { getWeek } from '../../utils/functions';
import { addWeeks, endOfWeek, isBefore, startOfWeek, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import css from './Calendar.module.css';
import { transitionTimingFunction } from '../../types/types';

type Props = {
  date: Date;
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

const RenderMonths = ({ date, month, index }: { date: Date; month: string; index: number }) => {
  const startWeek = startOfWeek(date, { locale: ru }).getMonth();
  const endWeek = endOfWeek(date, { locale: ru }).getMonth();
  const inMonth = startWeek === index;
  const inNextMonth = endWeek === index + 1 && inMonth;

  const style = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `500ms`,
    transitionTimingFunction,
  };

  const transitionStyles = {
    entering: { opacity: 0, transform: 'translateX(100%)' },
    entered: { opacity: 1, transform: 'translateX(0)' },
    exiting: { opacity: 1, transform: 'translateX(0)' },
    exited: { opacity: 0, transform: 'translateX(100%)' },
  };

  return (
    <div className='h-5 absolute' key={month}>
      <Transition in={inMonth} timeout={timeout}>
        {(state: TransitionStatus) => (
          <div
            className='text-my-chrome font-light inline-block pr-4 opacity-0'
            style={{ ...style, ...transitionStyles[state] }}
          >
            {month}
          </div>
        )}
      </Transition>
      <Transition in={inNextMonth} timeout={timeout}>
        {(state: TransitionStatus) => (
          <div
            className='text-my-purple font-light text-xs inline-block opacity-0'
            style={{ ...style, ...transitionStyles[state] }}
          >
            {months[index + 1]}
          </div>
        )}
      </Transition>
    </div>
  );
};

const Month = ({ date, setDay, setWeek }: Props) => {
  const handleClickForward = () => {
    const nextWeek = addWeeks(date, 1);
    setDay(nextWeek);
    setWeek(getWeek(nextWeek));
  };
  const handleClickBack = () => {
    const nextWeek = subWeeks(date, 1);
    setDay(nextWeek);
    setWeek(getWeek(nextWeek));
  };

  return (
    <div className='flex justify-between items-center mt-3 mb-2'>
      <div className='w-36 h-5 relative overflow-hidden select-none'>
        {months.map((month, key) => (
          <RenderMonths date={date} month={month} key={key} index={key} />
        ))}
      </div>
      <div>
        {isBefore(startOfWeek(new Date()), startOfWeek(date)) && (
          <ArrowSmLeftIcon
            className='h-6 w-6 inline-block text-my-turquoise cursor-pointer'
            onClick={handleClickBack}
          />
        )}
        <ArrowSmRightIcon
          className='h-6 w-6 inline-block text-my-turquoise cursor-pointer'
          onClick={handleClickForward}
        />
      </div>
    </div>
  );
};

export default Month;
