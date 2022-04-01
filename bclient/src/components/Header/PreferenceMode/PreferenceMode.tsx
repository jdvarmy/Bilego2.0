import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';

const PreferenceMode = () => {
  const clickHandler = () => {};

  return (
    <div className='flex items-center w-36 cursor-pointer' onClick={clickHandler}>
      <HeartIcon className='w-10 h-10 ml-3 stroke-1 stroke-chrome-500' />
      <span className='text-xs ml-0.5 text-chrome-500'>режим предпочтений</span>
    </div>
  );
};

export default PreferenceMode;
