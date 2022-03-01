import React, { useEffect } from 'react';
import Layout from '../../src/layout/Layout';
import { useTypeSelector } from '../../src/hooks/useTypeSelector';
import { eventsSelector } from '../../src/store/selectors';
import { getEventsClientSide } from '../../src/store/events/eventsSlice';
import { useDispatch } from 'react-redux';
import { getEventsServerSide } from '../../src/store/events/eventsThunk';
import SkeletonEvent from '../../src/components/Skeletons/SkeletonEvent';

const Events = () => {
  const dispatch = useDispatch();
  const { events } = useTypeSelector(eventsSelector);

  useEffect(() => {
    if (!events.length) {
      dispatch(getEventsClientSide());
    }
  }, []);

  return (
    <Layout>
      <h1 className='text-3xl font-bold underline'>Events</h1>
      <SkeletonEvent />
    </Layout>
  );
};

export default Events;

export const getServerSideProps = getEventsServerSide;
