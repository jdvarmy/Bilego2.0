import React, { useEffect, useMemo, useState } from 'react';
import { TicketType } from '../../../typings/enum';
import TableGrid from '../../../components/TableGrid/TableGrid';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTicketsStore } from '../../../store/selectors';
import { getTickets, setTickets } from '../../../store/ticketsSlice/ticketsSlice';
import { AppDispatch } from '../../../store/store';
import { Ticket } from '../../../typings/types';
import { getActualSell } from '../../../helpers/getActualSell';
import { localActions, localColor, localDate, localPrice, localTitle } from './ticketsContentHelpers';

// @ts-ignore
import { groupBy } from 'lodash';

interface Row {
  name: string;
  stock: number;
  dateFrom: string;
  dateTo: string;
  totalPrice: number;
  color: string;
  actions: any;
}

type Props = {
  type?: TicketType;
  selectedDateUid?: string;
};

const factoryCols = () => [
  {
    key: 'name',
    name: <Box>Название</Box>,
    resizable: true,
    minWidth: 255,
    maxWidth: 315,
    SelectCellFormatter: {
      isCellSelected: false,
    },
    formatter: ({ row }: any) => localTitle(row),
    groupFormatter: ({ childRows }: any) => localTitle(childRows[0]),
  },
  {
    key: 'stock',
    name: <Box>Кол-во</Box>,
    width: 85,
    formatter: () => null,
    groupFormatter: ({ childRows }: any) => childRows[0]?.stock,
  },
  {
    key: 'dateFrom',
    name: <Box>С</Box>,
    formatter: ({ row }: any) => localDate(row?.dateFrom),
    groupFormatter: ({ childRows }: any) => localDate(getActualSell(childRows)?.dateFrom),
  },
  {
    key: 'dateTo',
    name: <Box>По</Box>,
    formatter: ({ row }: any) => localDate(row?.dateTo),
    groupFormatter: ({ childRows }: any) => localDate(getActualSell(childRows)?.dateTo),
  },
  {
    key: 'totalPrice',
    name: <Box>Цена</Box>,
    formatter: ({ row }: any) => localPrice(row?.totalPrice),
    groupFormatter: ({ childRows }: any) => localPrice(getActualSell(childRows)?.totalPrice),
  },
  {
    key: 'color',
    name: <Box>color</Box>,
    width: 85,
    formatter: ({ row }: any) => localColor(row?.color),
    groupFormatter: ({ childRows }: any) => localColor(getActualSell(childRows)?.color),
  },
  {
    key: 'actions',
    name: <Box sx={{ textAlign: 'right' }} />,
    width: 100,
    formatter: () => null,
    groupFormatter: ({ childRows }: any) => localActions(childRows[0]?.actions),
  },
];
const factoryRows = (tickets: Ticket[]) =>
  tickets.flatMap(({ uid, name, description, stock, sell }) =>
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

const TicketsContent = ({ type, selectedDateUid }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { tickets, selectedTicket } = useSelector(selectTicketsStore);
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
      <TableGrid
        // @ts-ignore
        columns={cols}
        rows={rows}
        onRowClick={(row: any) => console.log(row)}
        groupBy={['name']}
        rowGrouper={rowGrouper}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
      />
    </Box>
  );
};

export default TicketsContent;
