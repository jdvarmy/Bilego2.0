import React, { useState } from 'react';
import { Button, CardHeader, Divider, Grid, TextField, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { TicketType } from '../../../typings/enum';
import TextFieldWithDisabledButton from '../../../components/TextFieldWithDisabledButton/TextFieldWithDisabledButton';
import { Ticket, TicketOnSell } from '../../../typings/types';
import TicketOnSellContent from './TicketOnSellContent';
import { v4 as uidv4 } from 'uuid';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

type Props = {
  type?: TicketType;
};

const initialTicketSellDataFc = (): TicketOnSell => ({
  uid: uidv4(),
  price: 0,
  service: 0,
  totalPrice: 0,
  dateFrom: undefined,
  dateTo: undefined,
  color: undefined,
});
const initialTicketDataFc = (): Ticket => ({
  uid: uidv4(),
  type: undefined,
  name: undefined,
  description: undefined,
  stock: 0,
  seat: undefined,
  row: undefined,
  sector: undefined,
  sell: [initialTicketSellDataFc()],
});

const TicketControls = ({ type }: Props) => {
  const [ticketData, setTicketData] = useState<Ticket>(initialTicketDataFc());

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

  return (
    <Grid container alignItems='center' spacing={3}>
      {type === TicketType.simple ? (
        <>
          <Grid item xs={4}>
            <TextField label='Название билета' type='text' fullWidth size='small' />
          </Grid>
          <Grid item xs>
            <TextField label='Описание' type='text' fullWidth size='small' />
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
        <TextField label='Количество' type='number' fullWidth size='small' />
      </Grid>
      <Grid item xs={2} container justifyContent='flex-end'>
        <Button variant='outlined' size='small' color='success'>
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
