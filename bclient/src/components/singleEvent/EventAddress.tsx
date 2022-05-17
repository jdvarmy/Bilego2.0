import React from 'react';
import EventTitleBlock from './components/EventTitleBlock';
import { Item } from '../../types/types';
import H3 from '../typography/H3';

type Props = {
  item: Item;
};

const EventAddress = ({ item }: Props) => {
  return (
    <div>
      <EventTitleBlock title='Адрес' />
      <div className='grid grid-cols-3 grid-flow-col gap-9.5 h-[calc(396px_+_0px)]'>
        <div className='h-full w-full bg-blue-800 px-12 pt-16 rounded-4xl overflow-hidden'>
          <H3 className='mb-20'>{item.title}</H3>
          <div className='text-chrome pb-3'>{item.meta?.metro && Object.values(item.meta.metro).join(', ')}</div>
          <div className='text-chrome'>{item.meta?.address}</div>
        </div>
        <div className='col-span-2 h-full w-full bg-blue-800 rounded-4xl overflow-hidden'></div>
      </div>
    </div>
  );
};

export default EventAddress;
