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
import AppTicket from '../../../src/components/AppTicket/AppTicket';
import EventContent from '../../../src/components/singleEvent/EventContent';
import EventAddress from '../../../src/components/singleEvent/EventAddress';
import Breadcrumb from '../../../src/components/Breadcrumb/Breadcrumb';

const SingleEvent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { city } = useTypeSelector(globalSelector);
  const { event } = useTypeSelector(eventsSelector);

  console.log(event);
  const { title, excerpt, club, dates, categories, visitorAge, content } = useMemo(
    () => ({
      title: event?.title,
      excerpt: event?.excerpt,
      club: event?.club,
      dates: event?.dates,
      categories: event?.categories,
      visitorAge: event?.meta?.visitorAge,
      content: event?.content,
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
                'todo: что-то базовое'
              )}
            </div>
          </div>
          <div className='text-chrome w-[calc(565px_+_0px)] mt-8 mb-12'>{excerpt}</div>
          <div className='h-[calc(690px_+_0px)] mb-32'>
            <AppTicket />
          </div>
          <EventContent className='mb-32' text={content || ''} />
          <div className='mb-32'>галерея с видео</div>
          {club && <EventAddress className='mb-32' item={club} />}
          <div className='mb-32'>расписание</div>
          <div className='mb-32'>недавно смотрели</div>
          <div className='mb-32'>что-то еще</div>
          <Breadcrumb title={title} />
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
