import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading/Loading';
import Tickets from '../components/Tickets/Tickets';
import Error from '../components/Error/Error';
import { selectOptions } from '../store/selectors';
import { usePostMessageListener } from '../hooks/usePostMessageListener';
import ManageButton from '../components/ManageButton';
import Header from '../components/Header/Header';

const TicketLayout = () => {
  const { status } = useSelector(selectOptions);

  usePostMessageListener();

  return (
    <div className='relative bg-white'>
      <Header />
      <Loading status={status} />
      <Tickets status={status} />
      <Error status={status} />
      <ManageButton status={status} />
    </div>
  );
};

export default TicketLayout;
