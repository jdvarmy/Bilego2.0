import { AppThunk } from '../store';
import { requestTickets } from '../../api/requests';
import { addTicket } from './ticketsSlice';
import { setApplicationStatus } from '../optionsSlice/optionsSlice';
import { ApplicationStatuses } from '../../typings/enum';

export const fetchTickets =
  ({ id, slug }: { id?: number; slug?: string }): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await requestTickets({ id, slug });

      dispatch(addTicket(data));
    } catch (e) {
      console.log(e);
      dispatch(setApplicationStatus(ApplicationStatuses.error));
    }
  };
