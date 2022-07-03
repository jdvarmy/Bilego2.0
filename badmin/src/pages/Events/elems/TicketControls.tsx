import React, { ChangeEvent, useState } from 'react';
import { Button, CardHeader, Divider, Grid, TextField, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { TicketType } from '../../../typings/enum';
import TextFieldWithDisabledButton from '../../../components/TextFieldWithDisabledButton/TextFieldWithDisabledButton';
import { Ticket, TicketOnSell } from '../../../typings/types';
import TicketOnSellContent from './TicketOnSellContent';
import { v4 as uidv4 } from 'uuid';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { saveTickets } from '../../../store/ticketsSlice/ticketsSlice';

type Props = {
  dateUid: string;
  type?: TicketType;
};

const initialTicketSellDataFc = (): TicketOnSell => ({
  uid: uidv4(),
  price: 0,
  service: 0,
  dateFrom: undefined,
  dateTo: undefined,
  color: undefined,
});
const initialTicketDataFc = (type?: TicketType): Ticket => ({
  uid: uidv4(),
  type: type,
  name: undefined,
  description: undefined,
  stock: 0,
  seat: undefined,
  row: undefined,
  sector: undefined,
  sell: [initialTicketSellDataFc()],
});

const TicketControls = ({ type, dateUid }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [ticketData, setTicketData] = useState<Ticket>(initialTicketDataFc(type));

  const handleChange = (field: keyof Ticket) => (e: ChangeEvent<HTMLInputElement>) => {
    setTicketData((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const handleAddTicketOnSell = () => {
    setTicketData((prev) => {
      const sell = prev?.sell || [];
      return { ...prev, sell: [...sell, initialTicketSellDataFc()] };
    });
  };
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
  const handleSaveTicket = () => {
    dispatch(saveTickets(dateUid, [ticketData]));
  };

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
        <Button variant='outlined' size='small' color='success' onClick={handleSaveTicket}>
          Сохранить билет
        </Button>
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
