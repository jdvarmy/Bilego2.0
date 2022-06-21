import React, { SyntheticEvent, memo, useEffect } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, IconButton, Tab, Tabs, Tooltip } from '@mui/material';
import { Event } from '../../../typings/types';
import EventDatesTabContent from './EventDatesTabContent';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { AppDispatch } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEventDate,
  EventStateFieldType,
  saveTemplateEventDate,
  setEventStateField,
  setSelectedDateId,
} from '../../../store/eventsSlice/eventsSlice';
import { selectEventSelectedDateId } from '../../../store/selectors';

type Props = {
  uid?: string;
  dates?: Event['eventDates'];
};

const EventDates = ({ uid, dates }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedDateId = useSelector(selectEventSelectedDateId);

  console.log('render EventDates');

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    dispatch(setSelectedDateId(newValue));
  };
  const handleAddTab = () => {
    if (uid) {
      dispatch(saveTemplateEventDate(uid));
    }
  };
  const handleDeleteTab = () => {
    if (selectedDateId && uid && dates) {
      const localDates = dates.filter((d) => d.id !== selectedDateId);
      dispatch(deleteEventDate(selectedDateId, uid));
      dispatch(setEventStateField({ eventDates: localDates } as EventStateFieldType));
      dispatch(setSelectedDateId(localDates.at(-1)?.id ?? undefined));
    }
  };

  useEffect(() => {
    dispatch(setSelectedDateId(Array.isArray(dates) ? dates.at(-1)?.id : undefined));
  }, []);

  return (
    <Card>
      <CardHeader title='Даты проведения события' />
      <Divider />
      <CardContent>
        <Grid container alignItems='center' spacing={3}>
          <Grid item xs={1} sx={{ display: 'flex' }}>
            <Tooltip arrow placement='top' title='Добавить новую дату выступления'>
              <IconButton color='success' onClick={handleAddTab}>
                <AddCircleTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='top' title='Удалить выбранную дату'>
              <span>
                <IconButton color='warning' disabled={dates && dates.length <= 1} onClick={handleDeleteTab}>
                  <DeleteForeverTwoToneIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={11}>
            <Tabs
              variant='scrollable'
              scrollButtons='auto'
              textColor='primary'
              indicatorColor='primary'
              value={selectedDateId || dates?.at(-1)?.id}
              onChange={handleChangeTab}
            >
              {dates?.map(({ id, dateFrom, dateTo }) => {
                const label = getTabLabel(dateFrom, dateTo);
                return <Tab key={id} label={label} value={id} />;
              })}
            </Tabs>
          </Grid>
        </Grid>
        <EventDatesTabContent selectDate={dates?.find((date) => date.id === selectedDateId)} dates={dates} />
      </CardContent>
    </Card>
  );
};

export default memo(EventDates);

function getTabLabel(dateFrom?: Date, dateTo?: Date): string {
  const dateFromLocal = dateFrom ? new Date(dateFrom).setHours(0, 0, 0, 0) : null;
  const dateToLocal = dateTo ? new Date(dateTo).setHours(0, 0, 0, 0) : null;
  const formatDate = 'dd MMMM, yyyy';

  if (dateFromLocal && dateFromLocal === dateToLocal) {
    return format(dateFromLocal, formatDate, { locale: ru });
  }
  if (dateFromLocal && !dateToLocal) {
    return format(dateFromLocal, `С ${formatDate}`, { locale: ru });
  }
  if (dateToLocal && !dateFromLocal) {
    return format(dateToLocal, `По ${formatDate}`, { locale: ru });
  }
  if (dateFromLocal && dateToLocal && dateFromLocal !== dateToLocal) {
    return format(dateFromLocal, 'dd MMMM', { locale: ru }) + format(dateToLocal, ` / ${formatDate}`, { locale: ru });
  }
  return 'Выберите дату';
}
