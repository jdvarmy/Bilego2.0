import React, { useEffect, useMemo } from 'react';
import { asyncGetEventById } from '../../../src/store/events/eventsThunk';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../src/hooks/useTypeSelector';
import { eventsSelector, globalSelector } from '../../../src/store/selectors';
import { getEventByIdClientSide } from '../../../src/store/events/eventsSlice';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ThunkDispatchType, wrapper } from '../../../src/store';
import EventHeader from '../../../src/components/singleEvent/EventHeader';

const SingleEvent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { city } = useTypeSelector(globalSelector);
  const { event } = useTypeSelector(eventsSelector);

  console.log(event);
  const { excerpt, club, dates, categories, visitorAge } = useMemo(
    () => ({
      excerpt: event?.excerpt,
      club: event?.club,
      dates: event?.dates,
      categories: event?.categories,
      visitorAge: event?.meta?.visitorAge,
    }),
    [event],
  );

  useEffect(() => {
    if (!event && router?.query?.id && typeof router.query.id === 'string') {
      dispatch(getEventByIdClientSide(router.query.id));
    }
  }, [event, dispatch]);

  // todo: добавить скелетон для хедера события при отсутствии данных
  return (
    <div className='w-full'>
      {event ? (
        <>
          <div>
            <div className='flex relative h-[calc(622px_+_0px)] w-[calc(100%_+_10rem) -mx-20 -mt-20 overflow-hidden'>
              {event.meta?.header && city ? (
                <EventHeader
                  {...event.meta.header}
                  city={city}
                  date={dates?.dateFrom}
                  club={{ slug: club?.slug, title: club?.title }}
                  categories={categories}
                  visitorAge={visitorAge}
                />
              ) : (
                'что-то базовое'
              )}
            </div>
          </div>
          <div className='text-chrome w-[calc(565px_+_0px)] mt-8'>{excerpt}</div>
          <div>map</div>
          <div>info</div>
          <div>gallery</div>
          <div>address</div>
          <div>raspisanie</div>
          <div>nedavno smotreli</div>
          <div>chtoto esho</div>
        </>
      ) : (
        ''
      )}
    </div>
  );
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
