import React, { useEffect, useMemo, useState } from 'react';
import { TicketType } from '../../../typings/enum';
import TableGrid from '../../../components/TableGrid/TableGrid';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTicketsStore } from '../../../store/selectors';
import { getTickets, setTickets } from '../../../store/ticketsSlice/ticketsSlice';
import { AppDispatch } from '../../../store/store';
import { Ticket } from '../../../typings/types';
import { getActualSell } from '../../../helpers/getActualSell';
import { LocalActions, LocalColor, localDate, LocalPrice, LocalTitle } from './TicketsContentHelpers';
import TicketMap from '../../../components/TicketMap/TicketMap';
// @ts-ignore
import { groupBy } from 'lodash';

type Props = {
  type?: TicketType;
  selectedDateUid?: string;
};

const TicketsContent = ({ type, selectedDateUid }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { tickets } = useSelector(selectTicketsStore);
  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(() => new Set<unknown>(new Set()));

  const cols = useMemo(factoryCols, []);
  const rows = useMemo(() => (!tickets ? [] : factoryRows(tickets)), [tickets]);

  const rowGrouper = (rows: any, _columnKey: string): Record<string, any> => groupBy(rows, 'uid');

  useEffect(() => {
    if (!type || !selectedDateUid) {
      return;
    }

    dispatch(getTickets(selectedDateUid));

    return () => {
      dispatch(setTickets(null));
    };
  }, [selectedDateUid, type, dispatch]);

  return (
    <Box sx={{ mx: '-16px' }}>
      {type === TicketType.map ? (
        <TicketMap />
      ) : (
        <TableGrid
          // @ts-ignore
          columns={cols}
          rows={rows}
          groupBy={['name']}
          rowGrouper={rowGrouper}
          expandedGroupIds={expandedGroupIds}
          onExpandedGroupIdsChange={setExpandedGroupIds}
        />
      )}
    </Box>
  );
};

export default TicketsContent;

function factoryCols() {
  return [
    {
      key: 'name',
      name: <Box>Название</Box>,
      resizable: true,
      minWidth: 255,
      maxWidth: 315,
      SelectCellFormatter: {
        isCellSelected: false,
      },
      formatter: ({ row }: any) => LocalTitle(row),
      groupFormatter: ({ childRows }: any) => LocalTitle(childRows[0]),
    },
    {
      key: 'stock',
      name: <Box>Кол-во</Box>,
      width: 85,
      formatter: () => null,
      groupFormatter: ({ childRows }: any) => <Typography variant='h5'>{childRows[0]?.stock}</Typography>,
    },
    {
      key: 'dateFrom',
      name: <Box>Начало</Box>,
      formatter: ({ row }: any) => localDate(row?.dateFrom),
      groupFormatter: ({ childRows }: any) => (
        <Typography variant='h5'>{localDate(getActualSell(childRows)?.dateFrom)}</Typography>
      ),
    },
    {
      key: 'dateTo',
      name: <Box>Конец</Box>,
      formatter: ({ row }: any) => localDate(row?.dateTo),
      groupFormatter: ({ childRows }: any) => (
        <Typography variant='h5'>{localDate(getActualSell(childRows)?.dateTo)}</Typography>
      ),
    },
    {
      key: 'totalPrice',
      name: <Box>Цена</Box>,
      formatter: ({ row }: any) => LocalPrice(row?.totalPrice),
      groupFormatter: ({ childRows }: any) => (
        <Typography variant='h5'>{LocalPrice(getActualSell(childRows)?.totalPrice)}</Typography>
      ),
    },
    {
      key: 'color',
      name: <Box>color</Box>,
      width: 85,
      formatter: ({ row }: any) => LocalColor(row?.color),
      groupFormatter: ({ childRows }: any) => LocalColor(getActualSell(childRows)?.color),
    },
    {
      key: 'actions',
      name: <Box sx={{ textAlign: 'right' }} />,
      width: 100,
      formatter: () => null,
      groupFormatter: ({ childRows }: any) => LocalActions(childRows[0]?.actions),
    },
  ];
}

function factoryRows(tickets: Ticket[]) {
  return tickets.flatMap(({ uid, name, description, stock, sell }) =>
    sell?.flatMap((s) => ({
      uid,
      name: { name, description },
      stock,
      dateFrom: s?.dateFrom,
      dateTo: s?.dateTo,
      totalPrice: { price: s?.price, service: s?.service },
      color: s?.color,
      actions: uid,
    })),
  );
}
