import React from 'react';
import css from './Skeleton.module.css';
import SkeletonEvent from './SkeletonEvent';

const SkeletonEvents = () => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className={`${css.SkeletonOdd} h-10 w-48 rounded-4xl`} />
        <div className={`${css.SkeletonOdd} h-8 w-36 rounded-4xl`} />
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
