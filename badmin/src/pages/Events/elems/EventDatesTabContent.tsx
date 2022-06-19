import React from 'react';
import { Grid, TextField } from '@mui/material';
import { DateTimePicker, StaticDatePicker } from '@mui/lab';
import { EventDate } from '../../../typings/types';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { EventStateFieldType, setEventStateField } from '../../../store/eventsSlice/eventsSlice';

type Props = {
  dates?: EventDate[];
  selectDate?: EventDate;
  isPeriod: boolean;
};

const pickerProps = {
  inputFormat: 'dd.MM.yyyy HH:mm',
  mask: '__.__.____ __:__',
  ampm: false,
  ampmInClock: false,
};

const EventDatesTabContent = ({ dates, selectDate, isPeriod }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  if (!selectDate || !dates) {
    return null;
  }

  const handleChangeDateTime =
    (field: keyof Pick<EventDate, 'closeDateTime' | 'dateFrom' | 'dateTo'>) => (date: Date | null) => {
      const eventDates = dates.map((d) => {
        if (d.id === selectDate?.id) {
          return { ...d, [field]: date ? new Date(new Date(date).setSeconds(0, 0)) : null };
        }

        return d;
      });

      dispatch(setEventStateField({ eventDates } as EventStateFieldType));
    };

  const handleChangeDate = (date: Date | null) => {
    const eventDates = dates.map((d) => {
      if (d.id === selectDate?.id) {
        const localDate = date ? new Date(new Date(date).setHours(0, 0, 0, 0)) : null;
        return { ...d, dateTo: localDate, dateFrom: localDate };
      }

      return d;
    });

    dispatch(setEventStateField({ eventDates } as EventStateFieldType));
  };

  // todo: доделать выбор периода и однодневного события
  return (
    <Grid sx={{ mt: 3 }} container spacing={3} alignItems='center'>
      {isPeriod ? (
        <Grid item xs={4}>
          <StaticDatePicker
            displayStaticWrapperAs='desktop'
            value={selectDate.dateFrom}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField fullWidth {...params} focused={!!selectDate.dateFrom} />}
          />
        </Grid>
      ) : (
        <>
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
        </>
      )}
    </Grid>
  );
};

export default EventDatesTabContent;
