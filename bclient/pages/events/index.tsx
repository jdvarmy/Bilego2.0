import React, { useEffect } from 'react';
import { useTypeSelector } from '../../src/hooks/useTypeSelector';
import { eventsSelector } from '../../src/store/selectors';
import { getEventsClientSide } from '../../src/store/events/eventsSlice';
import { useDispatch } from 'react-redux';
import SkeletonEvents from '../../src/components/Skeletons/SkeletonEvents';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ThunkDispatchType, wrapper } from '../../src/store';
import { asyncGetEvents } from '../../src/store/events/eventsThunk';
import { asyncGetTaxonomy } from '../../src/store/taxonomy/taxonomyThunk';

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
      <h1 className='text-h3 font-bold underline'>Events</h1>
      <SkeletonEvents />
      <ul className='mt-3'>
        {events.map((event) => (
          <li key={event.slug}>
            <Link href={`/events/${event.slug}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Events;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store): any => async () => {
  const dispatch = store.dispatch as ThunkDispatchType;

  try {
    await Promise.all([asyncGetEvents(dispatch), asyncGetTaxonomy(dispatch)]);
  } catch (e) {
    console.log('getServerSideProps events', e);
  }
});
