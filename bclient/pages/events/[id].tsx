import React, { useEffect } from 'react';
import { getEventByIdServerSide } from '../../src/store/events/eventsThunk';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../src/hooks/useTypeSelector';
import { eventsSelector } from '../../src/store/selectors';
import { getEventByIdClientSide } from '../../src/store/events/eventsSlice';
import { useRouter } from 'next/router';

const SingleEvent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { event } = useTypeSelector(eventsSelector);

  useEffect(() => {
    if (!event && router?.query?.id && typeof router.query.id === 'string') {
      dispatch(getEventByIdClientSide(router.query.id));
    }
  }, []);

  return <h1 className='text-3xl font-bold underline'>Single Event</h1>;
};

export default SingleEvent;

export const getServerSideProps = getEventByIdServerSide;
