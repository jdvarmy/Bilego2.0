import { TicketOnSell } from '../typings/types';

export const getActualSell = (sell: TicketOnSell[]): TicketOnSell | undefined => {
  const localDate = +new Date();
  return sell.find(({ dateFrom, dateTo }) => {
    if (dateFrom && dateTo && localDate >= Date.parse(dateFrom) && localDate <= Date.parse(dateTo)) {
      return true;
    } else if (!dateFrom && dateTo && localDate <= Date.parse(dateTo)) {
      return true;
    } else if (dateFrom && !dateTo && localDate >= Date.parse(dateFrom)) {
      return true;
    } else if (!dateFrom && !dateTo) {
      return true;
    }

    return false;
  });
};
