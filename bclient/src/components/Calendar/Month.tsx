import React from 'react';
import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/solid';
import { getWeek } from '../../utils/functions';
import { addWeeks, endOfWeek, isBefore, startOfWeek, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import css from './Calendar.module.css';

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
        {months.map((month, key) => {
          const startWeek = startOfWeek(date, { locale: ru }).getMonth();
          const endWeek = endOfWeek(date, { locale: ru }).getMonth();

          return (
            <div className='h-5 absolute' key={month}>
              <div
                className={`text-my-chrome font-light inline-block pr-4 -translate-x-full ${
                  startWeek === key ? `visible ${css.In}` : css.Out
                }`}
              >
                {month}
              </div>
              <div
                className={`text-my-purple font-light text-xs inline-block ${
                  endWeek === key + 1 && startWeek === key ? 'visible' : 'invisible'
                }`}
              >
                {months[key + 1]}
              </div>
            </div>
          );
        })}
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
