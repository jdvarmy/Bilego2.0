import React from 'react';
import css from './Skeleton.module.css';

const SkeletonSlider = () => {
  return (
    <div className={`${css.SkeletonEven} h-slider rounded-3xl`}>
      <div className='bg-blue-900 h-8 w-20 absolute left-10 top-36 rounded-2xl' />
      <div className='bg-blue-900 h-16 w-1/2 absolute left-10 bottom-44 rounded-full' />
      <div className='bg-blue-900 h-10 w-28 absolute left-10 top-96 rounded-3xl' />
    </div>
  );
};

export default SkeletonSlider;
