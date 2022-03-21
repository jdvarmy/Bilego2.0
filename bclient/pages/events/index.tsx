import React, { useEffect } from 'react';
import { useTypeSelector } from '../../src/hooks/useTypeSelector';
import { eventsSelector } from '../../src/store/selectors';
import { getEventsClientSide } from '../../src/store/events/eventsSlice';
import { useDispatch } from 'react-redux';
import { getEventsServerSide } from '../../src/store/events/eventsThunk';
import SkeletonEvent from '../../src/components/Skeletons/SkeletonEvent';
import { GetServerSideProps } from 'next';

const Events = () => {
  const dispatch = useDispatch();
  const { events } = useTypeSelector(eventsSelector);

  useEffect(() => {
    if (!events.length) {
      dispatch(getEventsClientSide());
    }
  }, [events.length, dispatch]);

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Events</h1>
      <SkeletonEvent />
    </>
  );
};

export default Events;

export const getServerSideProps: GetServerSideProps = getEventsServerSide;
