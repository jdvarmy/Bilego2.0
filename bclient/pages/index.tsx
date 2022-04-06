import React from 'react';
import Slider from '../src/components/Slider/Slider';
import EventsBlock from '../src/components/Blocks/EventsBlock';
import { GetServerSideProps } from 'next';
import { ThunkDispatchType, wrapper } from '../src/store';
import { setSlides } from '../src/store/slider/sliderSlice';
import { fetchSlides } from '../src/api/requests';
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
    // dispatch(asyncCheckIsUserLogin(context));
    const { data } = await fetchSlides();

    if (data) {
      dispatch(setSlides(data));
    }
  } catch (e) {
    console.log('getMainServerSide', e);
  }
});
