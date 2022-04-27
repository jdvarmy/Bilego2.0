import React from 'react';
import Slider from '../../src/components/Slider/Slider';
import EventsBlock, { EventsBlockProps } from '../../src/components/Blocks/EventsBlock';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ThunkDispatchType, wrapper } from '../../src/store';
import { asyncGetSlides } from '../../src/store/slider/sliderThunk';
import { Cities, SortType, Term } from '../../src/types/enums';
import { getAppPropCity, initialAppPropsToStaticProps } from '../_app';
import { asyncGetEventsBlock } from '../../src/store/events/eventsThunk';
import { setMainPageEventsUpcoming, setMainPageEventsWeekend } from '../../src/store/events/eventsSlice';
import { useTypeSelector } from '../../src/hooks/useTypeSelector';
import { eventsSelector } from '../../src/store/selectors';
import { ParametersType } from '../../src/types/types';
// import AppTicket from '../src/components/AppTicket/AppTicket';

const weekendParameters: ParametersType = {
  sort: SortType.asc,
  offset: 0,
  count: 2,
  weekends: true,
  include: { [Term.category]: 'all' },
};
const upcomingParameters: ParametersType = {
  sort: SortType.asc,
  offset: 0,
  count: 4,
};

const Index = () => {
  const { mainPageEventsWeekend, mainPageEventsUpcoming } = useTypeSelector(eventsSelector);
  return (
    <div className='flex-1'>
      <Slider />
      <EventsBlock parameters={weekendParameters} events={mainPageEventsWeekend} isUseIntersection />
      {/*<EventsBlock parameters={{}} events={mainPageEventsUpcoming} />*/}
      {/*<AppTicket />*/}
    </div>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store): any => async (context) => {
  const dispatch = store.dispatch as ThunkDispatchType;
  const city = await getAppPropCity(store, context);

  try {
    if (city) {
      new Error('City is empty');
    }

    const [_, __, weekendEvents] = await Promise.all([
      initialAppPropsToStaticProps(store),
      asyncGetSlides(dispatch, city),
      asyncGetEventsBlock({ ...weekendParameters, city }),
      // asyncGetEventsBlock({ ...upcomingParameters, city }),
    ]);

    if (weekendEvents) {
      dispatch(setMainPageEventsWeekend(weekendEvents));
    }

    // if (upcomingEvents) {
    //   dispatch(setMainPageEventsUpcoming(upcomingEvents));
    // }

    return { revalidate: 1800 };
  } catch (e) {
    console.log('getServerSideProps index', e);
  }
});

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.values(Cities).map((item) => ({
      params: {
        city: item,
      },
    })),
    fallback: false,
  };
};
