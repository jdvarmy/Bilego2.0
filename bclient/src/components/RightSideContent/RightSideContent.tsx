import React, { ReactNode } from 'react';
import Header from '../Header/Header';

type Props = {
  children?: ReactNode;
};

const RightSideContent = ({ children }: Props) => {
  return (
    <div className='flex flex-col w-full h-screen px-6 py-4 bg-my-blue'>
      <Header />
      {children}
    </div>
  );
};

export default RightSideContent;
