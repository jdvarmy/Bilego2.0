import React, { useEffect } from 'react';
import { asyncGetEventById } from '../../../src/store/events/eventsThunk';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../src/hooks/useTypeSelector';
import { eventsSelector } from '../../../src/store/selectors';
import { getEventByIdClientSide } from '../../../src/store/events/eventsSlice';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ThunkDispatchType, wrapper } from '../../../src/store';

const SingleEvent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { event } = useTypeSelector(eventsSelector);

  useEffect(() => {
    if (!event && router?.query?.id && typeof router.query.id === 'string') {
      dispatch(getEventByIdClientSide(router.query.id));
    }
  }, [event, dispatch]);

  return <h1 className='text-h3 font-bold underline'>{event?.title}</h1>;
};

export default SingleEvent;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store): any => async (context) => {
  const dispatch = store.dispatch as ThunkDispatchType;

  try {
    await Promise.all([asyncGetEventById(dispatch, context?.params?.id)]);
  } catch (e) {
    console.log('getServerSideProps event [id]', e);
  }
});
