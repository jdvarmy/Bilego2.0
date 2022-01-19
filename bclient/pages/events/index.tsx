import React, { useEffect } from 'react';
import Layout from '../../src/layout/Layout';
import { useTypeSelector } from '../../src/hooks/useTypeSelector';
import { eventsSelector } from '../../src/store/selectors';
import { getEventsClientSide } from '../../src/store/events/eventsSlice';
import { useDispatch } from 'react-redux';
import { getEventsServerSide } from '../../src/store/events/eventsThunk';

const Events = () => {
  const dispatch = useDispatch();
  const { events } = useTypeSelector(eventsSelector);

  useEffect(() => {
    if (!events.length) {
      dispatch(getEventsClientSide());
    }
  }, []);

  return <Layout>Events</Layout>;
};

export default Events;

export const getServerSideProps = getEventsServerSide;
