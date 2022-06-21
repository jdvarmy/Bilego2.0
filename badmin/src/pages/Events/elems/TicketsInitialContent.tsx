import React from 'react';
import { TicketType } from '../../../typings/enum';
import { Button, ButtonProps, Grid } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { editEventDate } from '../../../store/eventsSlice/eventsSlice';
import { EventDate } from '../../../typings/types';

type Props = {
  selectedDate?: EventDate;
};

const TicketsInitialContent = ({ selectedDate }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (type: TicketType) => () => {
    if (selectedDate) {
      const { id, ...data } = selectedDate;
      dispatch(editEventDate(id, { ...data, type }));
    }
  };

  const initialButtons: (ButtonProps & { label: string })[] = [
    {
      sx: { mr: 2, my: 0.5 },
      variant: 'outlined',
      startIcon: <MapIcon fontSize='small' />,
      label: 'Добавить билеты с картой',
      onClick: handleClick(TicketType.map),
    },
    {
      sx: { mx: 2, my: 0.5 },
      variant: 'outlined',
      startIcon: <LocalActivityIcon fontSize='small' />,
      label: 'Добавить входные билеты',
      onClick: handleClick(TicketType.simple),
    },
  ];

  return (
    <Grid item>
      {initialButtons.map(({ label, ...props }) => (
        <Button key={label} {...props}>
          {label}
        </Button>
      ))}
    </Grid>
  );
};

export default TicketsInitialContent;
