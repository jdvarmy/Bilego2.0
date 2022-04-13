import React from 'react';
import Slider from '../src/components/Slider/Slider';
import EventsBlock from '../src/components/Blocks/EventsBlock';
import { GetServerSideProps } from 'next';
import { ThunkDispatchType, wrapper } from '../src/store';
import { asyncGetTaxonomy } from '../src/store/taxonomy/taxonomyThunk';
import { asyncGetSlides } from '../src/store/slider/sliderThunk';
// import AppTicket from '../src/components/AppTicket/AppTicket';

const Index = () => {
  return (
    <div className='flex-1'>
      <Slider />
      <EventsBlock />
      {/*<AppTicket />*/}
    </div>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store): any => async (context) => {
  const dispatch = store.dispatch as ThunkDispatchType;

  try {
    await Promise.all([asyncGetSlides(dispatch), asyncGetTaxonomy(dispatch)]);
  } catch (e) {
    console.log('getServerSideProps index', e);
  }
});
