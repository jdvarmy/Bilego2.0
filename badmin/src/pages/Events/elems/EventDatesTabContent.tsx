import React from 'react';
import { Grid, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import { Event, EventDate } from '../../../typings/types';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { EventStateFieldType, setEventStateField } from '../../../store/eventsSlice/eventsSlice';

type Props = {
  selectDate?: EventDate;
  dates?: Event['eventDates'];
};

const pickerProps = {
  inputFormat: 'dd.MM.yyyy HH:mm',
  mask: '__.__.____ __:__',
  ampm: false,
  ampmInClock: false,
};

const EventDatesTabContent = ({ selectDate, dates }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  if (!selectDate) {
    return null;
  }

  const handleChangeDateTime =
    (field: keyof Pick<EventDate, 'closeDateTime' | 'dateFrom' | 'dateTo'>) => (date: Date | null) => {
      const eventDates = dates?.map((d) => {
        if (d.id === selectDate?.id) {
          return { ...d, [field]: date ? new Date(new Date(date).setSeconds(0, 0)) : null };
        }

        return d;
      });

      dispatch(setEventStateField({ eventDates } as EventStateFieldType));
    };

  return (
    <Grid sx={{ mt: 3 }} container spacing={3} alignItems='center'>
      <Grid item xs={3}>
        <DateTimePicker
          renderInput={(props) => <TextField focused={!!selectDate.dateFrom} fullWidth {...props} />}
          label='Начало'
          value={selectDate.dateFrom}
          onChange={handleChangeDateTime('dateFrom')}
          {...pickerProps}
        />
      </Grid>
      <Grid item xs={3}>
        <DateTimePicker
          renderInput={(props) => <TextField focused={!!selectDate.dateTo} fullWidth {...props} />}
          label='Конец'
          value={selectDate.dateTo}
          onChange={handleChangeDateTime('dateTo')}
          {...pickerProps}
        />
      </Grid>
      <Grid item xs={3}>
        <DateTimePicker
          renderInput={(props) => <TextField focused={!!selectDate.closeDateTime} fullWidth {...props} />}
          label='Закрытие продаж'
          value={selectDate.closeDateTime}
          onChange={handleChangeDateTime('closeDateTime')}
          {...pickerProps}
        />
      </Grid>
    </Grid>
  );
};

export default EventDatesTabContent;
