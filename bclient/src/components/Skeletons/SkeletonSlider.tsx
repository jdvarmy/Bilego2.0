import React from 'react';

const SkeletonSlider = () => {
  return (
    <div className='relative h-slider bg-my-purple rounded-3xl'>
      <div className='bg-my-blue h-8 w-20 absolute left-10 top-36 rounded-2xl' />
      <div className='bg-my-blue h-16 w-1/2 absolute left-10 top-52 rounded-full' />
      <div className='bg-my-blue h-16 w-1/3 absolute left-10 top-72 rounded-full' />
      <div className='bg-my-blue h-10 w-28 absolute left-10 top-96 rounded-3xl' />
    </div>
  );
};

export default SkeletonSlider;
