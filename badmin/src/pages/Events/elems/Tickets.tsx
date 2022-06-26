import React, { memo, useEffect } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectEventSelectedDateId, selectTicketsStore } from '../../../store/selectors';
import TicketsInitialContent from './TicketsInitialContent';
import { Event } from '../../../typings/types';
import TicketControls from './TicketControls';
import TicketsContent from './TicketsContent';

type Props = {
  dates?: Event['eventDates'];
};

const Tickets = ({ dates }: Props) => {
  const selectedDateId = useSelector(selectEventSelectedDateId);
  const { tickets, selectedTicket } = useSelector(selectTicketsStore);
  const selectedDate = dates?.find((date) => date.id === selectedDateId);

  console.log('render Tickets');
  console.log(tickets);

  useEffect(() => {
    if (!selectedDate?.type) {
      return;
    }

    console.log('Здесь идет запрос билетов');
  }, [selectedDateId, selectedDate]);

  if (!selectedDateId) {
    return null;
  }

  return (
    <Card>
      <CardHeader title='Билеты' />
      <Divider />
      <CardContent>
        <Grid container alignItems='center' spacing={3}>
          {!selectedDate?.type ? (
            <TicketsInitialContent selectedDate={selectedDate} />
          ) : (
            <>
              <Grid item xs={12}>
                <TicketsContent type={selectedDate?.type} />
              </Grid>
              <Grid item xs={12}>
                <TicketControls type={selectedDate?.type} />
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(Tickets);
