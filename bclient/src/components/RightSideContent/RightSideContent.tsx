import React, { ReactNode } from 'react';
import Header from '../Header/Header';

type Props = {
  children?: ReactNode;
};

const RightSideContent = ({ children }: Props) => {
  return (
    <div className='relative ml-menu flex flex-col w-[calc(100%_-_280px)] bg-blue-900 py-9.5 px-20'>
      <Header />
      {children}
    </div>
  );
};

export default RightSideContent;
