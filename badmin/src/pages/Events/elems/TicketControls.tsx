import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, CardHeader, Divider, Grid, TextField, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { TicketType } from '../../../typings/enum';
import TextFieldWithDisabledButton from '../../../components/TextFieldWithDisabledButton/TextFieldWithDisabledButton';
import { Ticket, TicketOnSell } from '../../../typings/types';
import TicketOnSellContent from './TicketOnSellContent';
import { v4 as uidv4 } from 'uuid';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { AppDispatch } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { saveTickets } from '../../../store/ticketsSlice/ticketsSlice';
import { selectTicketsStore } from '../../../store/selectors';

type Props = {
  dateUid: string;
  type?: TicketType;
};

const TicketControls = ({ type, dateUid }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedTicket } = useSelector(selectTicketsStore);
  const [ticketData, setTicketData] = useState<Ticket>(() => selectedTicket || initialTicketDataFc(type));

  const isEditTicket = useMemo(() => !!selectedTicket, [selectedTicket]);

  const handleChange = (field: keyof Ticket) => (e: ChangeEvent<HTMLInputElement>) => {
    setTicketData((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const handleAddTicketOnSell = useCallback(() => {
    setTicketData((prev) => {
      const sell = prev?.sell || [];
      return { ...prev, sell: [...sell, initialTicketSellDataFc()] };
    });
  }, []);
  const handleDeleteTicketOnSell = (uid: string) => () => {
    if (!uid) {
      return;
    }

    setTicketData((prev) => {
      const sell = prev.sell;
      if (sell && sell.length > 1) {
        return { ...prev, sell: sell.filter((s) => s.uid !== uid) };
      }
      return prev;
    });
  };
  const handleSaveTicket = useCallback(
    (type: 'edit' | 'save') => () => {
      dispatch(saveTickets(type, dateUid, [ticketData]));
    },
    [ticketData, type, dateUid, dispatch],
  );

  useEffect(() => {
    if (selectedTicket) {
      setTicketData(selectedTicket);
    } else {
      setTicketData(initialTicketDataFc(type));
    }
  }, [selectedTicket]);

  return (
    <Grid container alignItems='center' spacing={3}>
      {type === TicketType.simple ? (
        <>
          <Grid item xs={4}>
            <TextField
              label='Название билета'
              type='text'
              fullWidth
              size='small'
              focused={!!ticketData.name}
              value={ticketData.name || ''}
              onChange={handleChange('name')}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label='Описание'
              type='text'
              fullWidth
              size='small'
              focused={!!ticketData.description}
              value={ticketData.description || ''}
              onChange={handleChange('description')}
            />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={8} container>
            <TextFieldWithDisabledButton label='Место' type='text' fullWidth size='small' />
            <TextFieldWithDisabledButton sx={{ mx: '1.5rem' }} label='Ряд' type='text' fullWidth size='small' />
            <TextFieldWithDisabledButton label='Сектор' type='text' fullWidth size='small' />
          </Grid>
        </>
      )}
      <Grid item xs={2}>
        <TextField
          label='Количество'
          type='number'
          fullWidth
          size='small'
          focused={!!ticketData.stock}
          value={ticketData.stock}
          onChange={handleChange('stock')}
        />
      </Grid>
      <Grid item xs={2} container justifyContent='flex-end'>
        <Tooltip
          arrow
          placement='top'
          title={`Вся информация о билете, включая периоды продаж, сохраниться только после нажатия на эту кнопку. ${
            isEditTicket ? 'Отменить редактирование Вы можете нажав на кнопку отмены выше' : ''
          }`}
        >
          <Button
            variant='outlined'
            size='small'
            color={isEditTicket ? 'warning' : 'success'}
            onClick={handleSaveTicket(isEditTicket ? 'edit' : 'save')}
          >
            {isEditTicket ? 'Редактировать' : 'Сохранить'} билет
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <div>
                <Tooltip arrow placement='top' title='Добавить новую дату продаж билета'>
                  <IconButton color='success' onClick={handleAddTicketOnSell}>
                    <AddCircleTwoToneIcon />
                  </IconButton>
                </Tooltip>{' '}
                Продажа билета
              </div>
            }
          />
          <Divider />
          <CardContent>
            {ticketData.sell?.map((sell, _, array) => (
              <TicketOnSellContent
                key={sell.uid}
                {...sell}
                setTicketData={setTicketData}
                isOpenAccordion={array.at(-1)?.uid === sell.uid}
                deleteDisable={array.length < 2}
                onDeleteSell={handleDeleteTicketOnSell}
              />
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TicketControls;

function initialTicketSellDataFc(): TicketOnSell {
  return {
    uid: uidv4(),
    price: 0,
    service: 0,
    dateFrom: undefined,
    dateTo: undefined,
    color: undefined,
  };
}
function initialTicketDataFc(type?: TicketType): Ticket {
  return {
    uid: uidv4(),
    type: type,
    name: undefined,
    description: undefined,
    stock: 0,
    seat: undefined,
    row: undefined,
    sector: undefined,
    sell: [initialTicketSellDataFc()],
  };
}
