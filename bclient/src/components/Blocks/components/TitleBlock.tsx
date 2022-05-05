import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';

const TitleBlock = ({ title, link = true }: { title: string; link?: boolean }) => {
  return (
    <div className='flex justify-between mb-7'>
      <div className='text-h2 text-purple font-bold'>{title}</div>
      {link && (
        <div className='flex items-center justify-center border border-raspberry cursor-pointer rounded-3xl h-9'>
          <span className='pl-4'>посмотреть все</span>{' '}
          <ChevronRightIcon className='h-5 w-8 stroke-1 inline-block text-raspberry mr-1.5' />
        </div>
      )}
    </div>
  );
};

export default TitleBlock;
