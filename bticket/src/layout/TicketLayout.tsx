import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTickets } from '../store/selectors';
import { fetchTickets } from '../store/ticketsSlice/ticketsThunk';

const TicketLayout = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(selectTickets);

  useEffect(() => {
    dispatch(fetchTickets({ id: 2314, slug: 'asdasd' }));

    console.log(tickets);
  }, [dispatch]);

  return <div>TicketLayout</div>;
};

export default TicketLayout;
