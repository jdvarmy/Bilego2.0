import { AppThunk } from '../store';
import { requestTickets } from '../../api/requests';
import { addTicket } from './ticketsSlice';

export const fetchTickets =
  ({ id, slug }: { id?: number; slug?: string }): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await requestTickets({ id, slug });
      console.log(data);

      dispatch(addTicket(data));
    } catch (e) {
      console.log(e);
      // dispatch(logError(e, 'fetchVersion'));
    }
  };
