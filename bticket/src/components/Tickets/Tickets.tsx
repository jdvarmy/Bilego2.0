import React from 'react';
import EntranceTicket from '../EntranceTicket/EntranceTicket';
import SeatTickets from '../SeatTickets/SeatTickets';
import { ApplicationStatuses } from '../../typings/enum';

type Props = {
  status: ApplicationStatuses;
};

const Tickets = ({ status }: Props) => {
  return status === ApplicationStatuses.ready ? (
    <div>
      <EntranceTicket />
      <SeatTickets />
    </div>
  ) : null;
};

export default Tickets;
