import React from 'react';
import css from './Skeleton.module.css';

const SkeletonEvent = () => {
  return (
    <div className={`${css.SkeletonOdd} relative w-full h-event rounded-3xl overflow-hidden`}>
      <div className='w-full h-full object-center object-cover lg:w-full lg:h-full' />
      <div>
        <div className='absolute top-48 left-0 w-16 h-9 bg-blue-900 rounded-r-2xl' />
        <div className='absolute top-64 left-6 w-2/3 h-10 bg-blue-900 rounded-2xl' />
      </div>
    </div>
  );
};

const SkeletonEvents = () => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className={`${css.SkeletonOdd} h-10 w-48 rounded-3xl`} />
        <div className={`${css.SkeletonOdd} h-8 w-36 rounded-3xl`} />
      </div>
      <div className='mt-3 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
        {Array(3)
          .fill(1)
          .map((_, key) => (
            <SkeletonEvent key={key} />
          ))}
      </div>
    </div>
  );
};

export default SkeletonEvents;
