import React from 'react';
import Slider from '../../src/components/Slider/Slider';
import EventsBlock from '../../src/components/Blocks/EventsBlock/EventsBlock';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ThunkDispatchType, wrapper } from '../../src/store';
import { asyncGetSlides } from '../../src/store/slider/sliderThunk';
import { Cities, SortType, EventTerm } from '../../src/types/enums';
import { getAppPropCity, initialAppPropsToStaticProps } from '../_app';
import { asyncGetEventsBlock } from '../../src/store/events/eventsThunk';
import { setMainPageEventsUpcoming, setMainPageEventsWeekend } from '../../src/store/events/eventsSlice';
import { useTypeSelector } from '../../src/hooks/useTypeSelector';
import { eventsSelector } from '../../src/store/selectors';
import { ParametersType } from '../../src/types/types';
import ForSelectiveViewers from '../../src/components/Blocks/ForSelectiveViewers/ForSelectiveViewers';
import Selections from '../../src/components/Blocks/Selections/Selections';

const weekendParameters: ParametersType = {
  sort: SortType.asc,
  offset: 0,
  count: 2,
  weekends: true,
  include: { [EventTerm.category]: 'all' },
};
const upcomingParameters: ParametersType = {
  sort: SortType.asc,
  offset: 0,
  count: 2,
  weekends: false,
  include: { [EventTerm.category]: 'all' },
};

const Index = () => {
  const { mainPageEventsWeekend, mainPageEventsUpcoming } = useTypeSelector(eventsSelector);
  return (
    <div className='flex-1'>
      <Slider />
      <EventsBlock
        title='На выходные'
        parameters={weekendParameters}
        events={mainPageEventsWeekend}
        isUseIntersection
      />
      <div className='flex'>
        <div className='flex items-center bg-purple w-full h-32 mt-36 mb-32 rounded-4xl'>
          <span className='text-h2 ml-12'>Скидки на билеты</span>
        </div>
      </div>
      <EventsBlock
        title='Ближайшие'
        parameters={upcomingParameters}
        events={mainPageEventsUpcoming}
        isUseIntersection
      />
      <ForSelectiveViewers />
      <Selections />
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

    const [_, __, weekendEvents, upcomingEvents] = await Promise.all([
      initialAppPropsToStaticProps(store),
      asyncGetSlides(dispatch, city),
      asyncGetEventsBlock({ ...weekendParameters, city }),
      asyncGetEventsBlock({ ...upcomingParameters, city }),
    ]);

    if (weekendEvents) {
      dispatch(setMainPageEventsWeekend(weekendEvents));
    }

    if (upcomingEvents) {
      dispatch(setMainPageEventsUpcoming(upcomingEvents));
    }

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
