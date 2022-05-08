import React from 'react';

type Props = {
  title: string;
};

const EventTitleBlock = ({ title }: Props) => {
  return (
    <div className='flex justify-between mb-7'>
      <div className='text-h2 text-purple font-bold'>{title}</div>
    </div>
  );
};

export default EventTitleBlock;
