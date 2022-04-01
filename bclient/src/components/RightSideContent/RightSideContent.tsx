import React, { ReactNode } from 'react';
import Header from '../Header/Header';

type Props = {
  children?: ReactNode;
};

const RightSideContent = ({ children }: Props) => {
  return (
    <div className='relative ml-menu flex flex-col w-full bg-blue-900 py-9.5 px-20'>
      <Header />
      {children}
    </div>
  );
};

export default RightSideContent;
