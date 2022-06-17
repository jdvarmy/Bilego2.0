import React, { useState } from 'react';
import {
  Box,
  Button,
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
  TextField,
  Tooltip,
} from '@mui/material';
import { Event } from '../../../typings/types';
import { EventStateFieldType, setEventStateField } from '../../../store/eventsSlice/eventsSlice';
import { AppDispatch } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvent } from '../../../store/selectors';
import { DateTimePicker } from '@mui/lab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MapIcon from '@mui/icons-material/Map';

const EventDates = () => {
  const dispatch: AppDispatch = useDispatch();
  const event: Event | null = useSelector(selectEvent);
  const [full, setFull] = useState<boolean>(false);

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFull(event.target.checked);
  };
  const handleChange = (field: keyof Event) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEventStateField({ [field]: event.target.value } as EventStateFieldType));
  };
  const handleChangeDateTime = (date: Date | null) => {
    // dispatch(setEventStateField({ [field]: event.target.value } as EventStateFieldType));
    console.log(date);
  };
  const handleButtonClick = () => {
    console.log(11);
  };

  console.log(event?.eventDates);

  return (
    <Card>
      <CardHeader title='Даты проведения события' />
      <Divider />
      {event?.eventDates ? (
        <CardContent>
          <Grid container alignItems='center' spacing={3}>
            <Grid item xs={8}>
              <Tabs
                variant='scrollable'
                scrollButtons='auto'
                textColor='primary'
                indicatorColor='primary'
                value={1}
                // onChange={handleChange}
                aria-label='basic tabs example'
              >
                <Tab label='Item One' value={1} />
                <Tab label='Item Two' value={2} />
                <Tab label='Item Three' value={3} />
              </Tabs>
            </Grid>
            <Grid item xs={4} container justifyContent='space-between' wrap='nowrap' alignItems='center'>
              <Grid item container justifyContent='space-around' wrap='nowrap' alignItems='center'>
                <Grid item>
                  <Tooltip placement='top' arrow title='Добавить билеты с картой'>
                    <IconButton color='primary' onClick={handleButtonClick}>
                      <MapIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement='top' arrow title='Добавить входные билеты'>
                    <IconButton color='primary' onClick={handleButtonClick}>
                      <LocalActivityIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip placement='top' arrow title='Удалить дату проведения'>
                    <IconButton sx={{ mr: 3 }} color='primary' onClick={handleButtonClick}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid sx={{ textAlign: 'end' }}>
                <FormControlLabel control={<Switch checked={full} onChange={handleChangeSwitch} />} label='Вид' />
              </Grid>
            </Grid>
          </Grid>
          <Box>
            <Grid sx={{ mt: 3 }} container spacing={3} alignItems='center'>
              <Grid item xs={4}>
                <DateTimePicker
                  // clearable
                  renderInput={(props) => <TextField fullWidth {...props} />}
                  label='Конец'
                  value={new Date()}
                  onChange={handleChangeDateTime}
                  inputFormat='dd.MM.yyyy HH:mm'
                  mask='__.__.____ __:__'
                  ampm={false}
                  ampmInClock={false}
                />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Box>
        </CardContent>
      ) : (
        <CardContent>
          <Grid container alignItems='center' spacing={3}>
            <Grid item>
              <Button sx={{ mx: 2, my: 0.5 }} variant='outlined' startIcon={<MapIcon fontSize='small' />}>
                Добавить билеты с картой
              </Button>
              <Button sx={{ mx: 2, my: 0.5 }} variant='outlined' startIcon={<LocalActivityIcon fontSize='small' />}>
                Добавить входные билеты
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </Card>
  );
};

export default EventDates;
