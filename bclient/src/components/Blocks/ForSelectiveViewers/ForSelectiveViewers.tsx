import React from 'react';
import TitleBlock from '../components/TitleBlock';

const ForSelectiveViewers = () => {
  return (
    <div className='mt-32 flex w-full bg-blue-800 pt-20 pb-16 w-[calc(100%_+_10rem)] -mx-20 px-20'>
      <div className='w-full'>
        <TitleBlock title='Для избирательных' />
        <div className='flex'>
          {new Array(6).fill(1).map((_, key) => (
            <div key={key} className='w-full h-event-selective bg-purple rounded-4xl mr-6 last:mr-0' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForSelectiveViewers;
