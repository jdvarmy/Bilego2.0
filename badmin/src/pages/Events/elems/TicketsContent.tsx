import React from 'react';
import { TicketType } from '../../../typings/enum';

type Props = {
  type?: TicketType;
};

const TicketsContent = ({ type }: Props) => {
  return <div>TicketsContent {type}</div>;
};

export default TicketsContent;
