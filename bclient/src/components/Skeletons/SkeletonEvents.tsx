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
      <div className='mt-3 flex overflow-hidden'>
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
