import { ticketActionsClient } from './tickets/ticketsSlice';

const ActionCreators = {
  tickets: { ...ticketActionsClient },
};

export default ActionCreators;
