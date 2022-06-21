import React, { memo } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectEventSelectedDateId } from '../../../store/selectors';
import TicketsInitialContent from './TicketsInitialContent';
import { Event } from '../../../typings/types';

type Props = {
  dates?: Event['eventDates'];
};

const Tickets = ({ dates }: Props) => {
  const selectedDateId = useSelector(selectEventSelectedDateId);
  const selectedDate = dates?.find((date) => date.id === selectedDateId);

  console.log('render Tickets');

  if (!selectedDateId) {
    return null;
  }

  return (
    <Card>
      <CardHeader title='Билеты' />
      <Divider />
      <CardContent>
        <Grid container alignItems='center' spacing={3}>
          {<TicketsInitialContent selectedDate={selectedDate} />}
          <Grid item>{selectedDate?.type}</Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(Tickets);
