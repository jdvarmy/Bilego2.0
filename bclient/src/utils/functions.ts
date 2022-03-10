import { ru } from 'date-fns/locale';
import { endOfWeek, isBefore, startOfWeek, addDays } from 'date-fns';

export const getWeek = function (date: Date): Date[] {
  const startWeek = startOfWeek(date, { locale: ru });
  const endWeek = endOfWeek(date, { locale: ru });
  const week: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const day = addDays(startWeek, i);

    if (isBefore(day, endWeek)) {
      week.push(day);
    } else {
      return week;
    }
  }

  return week;
};
