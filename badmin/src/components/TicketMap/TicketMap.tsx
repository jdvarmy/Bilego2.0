import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedDateMap } from '../../store/selectors';

const TicketMap = () => {
  const map = useSelector(selectSelectedDateMap);
  console.log(map);

  return <div>TicketMap</div>;
};

export default memo(TicketMap);
