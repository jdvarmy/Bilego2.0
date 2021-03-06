import React, { memo, SyntheticEvent, useEffect } from 'react';
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
  setSelectedDateUid,
} from '../../../store/eventsSlice/eventsSlice';
import { selectEventSelectedDateUid } from '../../../store/selectors';
import { TicketType } from '../../../typings/enum';
import MapIcon from '@mui/icons-material/Map';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

type Props = {
  uid?: string;
  dates?: Event['eventDates'];
};

const EventDates = ({ uid, dates }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedDateUid = useSelector(selectEventSelectedDateUid);

  console.log('render EventDates');

  const handleChangeTab = (_: SyntheticEvent, newValue: string) => {
    dispatch(setSelectedDateUid(newValue));
  };
  const handleAddTab = () => {
    if (uid) {
      dispatch(saveTemplateEventDate(uid));
    }
  };
  const handleDeleteTab = () => {
    if (selectedDateUid && uid && dates) {
      const localDates = dates.filter((d) => d.uid !== selectedDateUid);
      dispatch(deleteEventDate(selectedDateUid, uid));
      dispatch(setEventStateField({ eventDates: localDates } as EventStateFieldType));
      dispatch(setSelectedDateUid(localDates.at(-1)?.uid ?? undefined));
    }
  };

  useEffect(() => {
    dispatch(setSelectedDateUid(Array.isArray(dates) ? dates.at(-1)?.uid : undefined));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader title='???????? ???????????????????? ??????????????' />
      <Divider />
      <CardContent>
        <Grid container alignItems='center' spacing={3}>
          <Grid item xs={1} sx={{ display: 'flex' }}>
            <Tooltip arrow placement='top' title='???????????????? ?????????? ???????? ??????????????????????'>
              <IconButton color='success' onClick={handleAddTab}>
                <AddCircleTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='top' title='?????????????? ?????????????????? ????????'>
              <span>
                <IconButton color='error' disabled={dates && dates.length <= 1} onClick={handleDeleteTab}>
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
              value={selectedDateUid || dates?.at(-1)?.uid}
              onChange={handleChangeTab}
            >
              {dates?.map(({ uid, dateFrom, dateTo, type }) => {
                const label = getTabLabel(dateFrom, dateTo);
                return (
                  <Tab
                    key={uid}
                    label={label}
                    value={uid}
                    icon={
                      !type ? undefined : type === TicketType.map ? (
                        <MapIcon fontSize='small' />
                      ) : (
                        <LocalActivityIcon fontSize='small' />
                      )
                    }
                    iconPosition='start'
                  />
                );
              })}
            </Tabs>
          </Grid>
        </Grid>
        <EventDatesTabContent selectDate={dates?.find((date) => date.uid === selectedDateUid)} dates={dates} />
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
    return format(dateFromLocal, `?? ${formatDate}`, { locale: ru });
  }
  if (dateToLocal && !dateFromLocal) {
    return format(dateToLocal, `???? ${formatDate}`, { locale: ru });
  }
  if (dateFromLocal && dateToLocal && dateFromLocal !== dateToLocal) {
    return format(dateFromLocal, 'dd MMMM', { locale: ru }) + format(dateToLocal, ` / ${formatDate}`, { locale: ru });
  }
  return '???????????????? ????????';
}
