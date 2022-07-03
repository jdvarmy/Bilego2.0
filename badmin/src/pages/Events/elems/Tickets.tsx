import React, { memo } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectEventSelectedDateUid } from '../../../store/selectors';
import TicketsInitialContent from './TicketsInitialContent';
import { Event } from '../../../typings/types';
import TicketControls from './TicketControls';
import TicketsContent from './TicketsContent';

type Props = {
  dates?: Event['eventDates'];
};

const Tickets = ({ dates }: Props) => {
  const selectedDateUid = useSelector(selectEventSelectedDateUid);
  const selectedDate = dates?.find((date) => date.uid === selectedDateUid);

  console.log('render Tickets');

  if (!selectedDateUid) {
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
                <TicketsContent type={selectedDate?.type} selectedDateUid={selectedDateUid} />
              </Grid>
              <Grid item xs={12}>
                <TicketControls type={selectedDate?.type} dateUid={selectedDate.uid} />
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(Tickets);
