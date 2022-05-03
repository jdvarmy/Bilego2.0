import React from 'react';
import css from './Skeleton.module.css';

const SkeletonSelections = () => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className={`${css.SkeletonOdd} h-16 w-64 rounded-4xl`} />
      </div>
      <div className='mt-3 grid grid-cols-2 grid-flow-row gap-9.5 overflow-hidden'>
        {Array(4)
          .fill(1)
          .map((_, key) => (
            <div key={key} className={`${css.SkeletonOdd} relative h-event-selection rounded-4xl overflow-hidden`} />
          ))}
      </div>
    </div>
  );
};

export default SkeletonSelections;
