import React from 'react';
import css from './Skeleton.module.css';

const SkeletonSlider = () => {
  return (
    <div className={`${css.SkeletonEven} h-slider rounded-4xl`}>
      <div className='bg-blue-900 h-8 w-20 absolute left-14 bottom-64 rounded-2xl' />
      <div className='bg-blue-900 h-16 w-1/2 absolute left-14 bottom-44 rounded-full' />
      <div className='bg-blue-900 h-12 w-40 absolute left-14 bottom-24 rounded-3xl' />
    </div>
  );
};

export default SkeletonSlider;
