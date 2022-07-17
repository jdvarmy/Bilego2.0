import React, { useCallback, useMemo } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { NotificationsBadge } from '../../../components/Header/HeaderNotifications/HeaderNotifications';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { AppDispatch } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectTicketsStore } from '../../../store/selectors';
import { deleteTickets, setSelectedTicket } from '../../../store/ticketsSlice/ticketsSlice';

export function LocalTitle(row: any) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start!important',
      }}
    >
      <Typography variant='h6'>{row?.name?.name}</Typography>
      <Typography variant='body2' sx={{ fontSize: '12px' }}>
        {row?.name?.description}
      </Typography>
    </Box>
  );
}

export function LocalPrice(props: { service?: number; price?: number } | undefined) {
  if (!props) {
    return 'Билет не продается';
  }

  return (
    <Box>
      {Number(props?.price) + Number(props?.service)}
      {props?.service ? (
        <Tooltip arrow title={`В стоимость билета входит сервисный сбор ${props.service} рублей`}>
          <NotificationsBadge
            badgeContent={props.service}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            max={9999}
          >
            <CurrencyRubleIcon fontSize='small' sx={{ fontSize: 13 }} />
          </NotificationsBadge>
        </Tooltip>
      ) : (
        <CurrencyRubleIcon fontSize='small' sx={{ fontSize: 13 }} />
      )}
    </Box>
  );
}

export function localDate(date?: string | Date) {
  if (!date) {
    return '-';
  }

  const formatDate = 'dd.MM.yyyy HH:mm';
  return format(Date.parse(date as string), formatDate, { locale: ru });
}

export function LocalColor(color?: string) {
  if (!color) {
    return '-';
  }

  return <Box sx={{ backgroundColor: color, overflow: 'hidden', borderRadius: '1rem', height: '100%' }} />;
}

export function LocalActions(uid: string) {
  const dispatch: AppDispatch = useDispatch();
  const { tickets, selectedTicket } = useSelector(selectTicketsStore);

  const editingTicket = useMemo(() => tickets?.find((t) => t.uid === uid), [tickets]);
  const isCurrentEditingTicket = useMemo(() => selectedTicket?.uid === uid, [selectedTicket]);

  const handleEdit = useCallback(() => {
    dispatch(setSelectedTicket(editingTicket));
  }, [editingTicket, dispatch]);
  const handleDelete = useCallback(() => {
    dispatch(deleteTickets([uid]));
  }, [uid, dispatch]);
  const handleCancel = useCallback(() => {
    dispatch(setSelectedTicket(undefined));
  }, [dispatch]);

  if (!uid) {
    return 'Нет идентификатора';
  }

  return (
    <Box sx={{ justifyContent: 'flex-end' }}>
      {isCurrentEditingTicket ? (
        <Tooltip arrow placement='top' title='Отменить редактирование билета'>
          <IconButton sx={{ p: 0, m: 0, mr: 1 }} color='secondary' onClick={handleCancel}>
            <HighlightOffTwoToneIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip arrow placement='top' title='Редактировать билет'>
          <IconButton sx={{ p: 0, m: 0, mr: 1 }} color='warning' onClick={handleEdit}>
            <EditTwoToneIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip arrow placement='top' title='Удалить билет'>
        <IconButton sx={{ p: 0, m: 0 }} color='error' onClick={handleDelete}>
          <DeleteForeverTwoToneIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
