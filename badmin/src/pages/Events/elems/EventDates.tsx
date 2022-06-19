import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import { Event, EventDate } from '../../../typings/types';
import EventDatesTabContent from './EventDatesTabContent';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import {
  deleteEventDate,
  EventStateFieldType,
  saveTemplateEventDate,
  setEventStateField,
} from '../../../store/eventsSlice/eventsSlice';

const getTabLabel = (dateFrom: Date | null, dateTo: Date | null): string => {
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
};

type Props = {
  uid?: string;
  dates?: Event['eventDates'];
};

const EventDates = ({ uid, dates }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isPeriod, setIsPeriod] = useState<boolean>(false);
  const [tab, setTab] = useState<string>(() => (dates ? dates[0]?.id : ''));
  const selectDate: EventDate | undefined = dates?.find((date) => date.id === tab);

  const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPeriod(event.target.checked);
  };
  const handleChangeTab = (_: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  const handleAddTab = () => {
    if (uid) {
      dispatch(saveTemplateEventDate(uid));
    }
  };
  const handleDeleteTab = () => {
    if (selectDate && uid && dates) {
      const localDates = dates.filter((d) => d.id !== selectDate.id);
      dispatch(deleteEventDate(selectDate.id, uid));
      dispatch(setEventStateField({ eventDates: localDates } as EventStateFieldType));
      setTab(localDates ? localDates[0]?.id : '');
    }
  };

  console.log(dates);

  return (
    <Card>
      <CardHeader title='Даты проведения события' />
      <Divider />
      <CardContent>
        <Grid container alignItems='center' spacing={3}>
          <Grid item xs={9}>
            <Tabs
              variant='scrollable'
              scrollButtons='auto'
              textColor='primary'
              indicatorColor='primary'
              value={tab}
              onChange={handleChangeTab}
            >
              {dates?.map(({ id, dateFrom, dateTo }) => {
                const label = getTabLabel(dateFrom, dateTo);
                return <Tab key={id} label={label} value={id} />;
              })}
            </Tabs>
          </Grid>
          <Grid item container xs={3} alignItems='center' justifyContent='space-between'>
            <Grid item>
              <Tooltip arrow placement='top' title='Добавить новую дату выступления'>
                <IconButton color='primary' onClick={handleAddTab}>
                  <AddCircleTwoToneIcon />
                </IconButton>
              </Tooltip>
              {dates && dates.length > 1 && (
                <Tooltip arrow placement='top' title='Удалить выбранную дату'>
                  <IconButton color='warning' onClick={handleDeleteTab}>
                    <DeleteForeverTwoToneIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <FormControlLabel
              control={<Switch disabled checked={isPeriod} onChange={handleChangeSwitch} />}
              label='Вид'
            />
          </Grid>
        </Grid>
        <EventDatesTabContent selectDate={selectDate} dates={dates} isPeriod={isPeriod} />
      </CardContent>
    </Card>
  );
};

export default EventDates;
