import React from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';

const City = () => {
  const clickHandler = () => {};

  return (
    <div className='flex items-center cursor-pointer' onClick={clickHandler}>
      <span className='text-xs text-chrome-500'>Санкт-Петербург</span>
      <LocationMarkerIcon className='ml-1 w-4 h-4 fill-raspberry-500' />
    </div>
  );
};

export default City;
