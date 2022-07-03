import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { NotificationsBadge } from '../../../components/Header/HeaderNotifications/HeaderNotifications';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

export function localTitle(row: any) {
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

export function localPrice(props: { service?: number; price?: number } | undefined) {
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

export function localDate(date?: string) {
  if (!date) {
    return '-';
  }

  const formatDate = 'dd.MM.yyyy HH:mm';
  return format(Date.parse(date), formatDate, { locale: ru });
}

export function localColor(color?: string) {
  if (!color) {
    return '-';
  }

  return <Box sx={{ backgroundColor: color, overflow: 'hidden', borderRadius: '1rem', height: '100%' }} />;
}

export function localActions(uid: string) {
  if (!uid) {
    return 'Нет идентификатора';
  }
  return (
    <>
      <Tooltip arrow placement='top' title='Редактировать билет'>
        <IconButton sx={{ p: 0, m: 0, mr: 1 }} color='warning'>
          <EditTwoToneIcon />
        </IconButton>
      </Tooltip>
      <Tooltip arrow placement='top' title='Удалить билет'>
        <IconButton sx={{ p: 0, m: 0 }} color='error'>
          <DeleteForeverTwoToneIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
