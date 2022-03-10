import React, { ReactNode } from 'react';
import Head from '../Head/Head';

type Props = {
  children?: ReactNode;
};

const RightSideContent = ({ children }: Props) => {
  return (
    <div className='flex-1 w-full h-screen px-6 py-4 bg-my-blue'>
      <Head />
      <div>{children}</div>
    </div>
  );
};

export default RightSideContent;
