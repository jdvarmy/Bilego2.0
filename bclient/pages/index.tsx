import React from 'react';
import Slider from '../src/components/Slider/Slider';
import EventsBlock from '../src/components/Blocks/EventsBlock';
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
