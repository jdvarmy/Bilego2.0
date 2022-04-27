import React from 'react';
import css from './Skeleton.module.css';

const SkeletonEvent = () => {
  return (
    <div className={`${css.SkeletonOdd} relative min-w-event-block min-h-event-block rounded-4xl overflow-hidden`}>
      <div className='w-full h-full min-w- object-center object-cover lg:w-full lg:h-full' />
      <div>
        <div className='absolute top-48 left-0 w-16 h-9 bg-blue-900 rounded-r-2xl' />
        <div className='absolute top-64 left-6 w-2/3 h-10 bg-blue-900 rounded-2xl' />
      </div>
    </div>
  );
};

export default SkeletonEvent;
