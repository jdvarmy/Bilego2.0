import React, { useEffect } from 'react';
import Slider from '../../src/components/Slider/Slider';
import EventsBlock from '../../src/components/Blocks/EventsBlock';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ThunkDispatchType, wrapper } from '../../src/store';
import { asyncGetSlides } from '../../src/store/slider/sliderThunk';
import { Cities } from '../../src/types/enums';
import { getAppPropCity, initialAppPropsToStaticProps } from '../_app';
// import AppTicket from '../src/components/AppTicket/AppTicket';

const Index = () => {
  useEffect(() => {
    // const events = asyncGetEventsBlock({});
  }, []);

  return (
    <div className='flex-1'>
      <Slider />
      <EventsBlock parameters={{}} />
      {/*<AppTicket />*/}
    </div>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store): any => async (context) => {
  const dispatch = store.dispatch as ThunkDispatchType;
  const city = getAppPropCity(store, context);

  try {
    await Promise.all([initialAppPropsToStaticProps(store), asyncGetSlides(dispatch, city)]);

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
