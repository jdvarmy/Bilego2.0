import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const LeftSideMenu = ({ children }: Props) => {
  return (
    <div className='w-80 flex flex-col h-screen px-6 py-4 bg-gradient-to-br from-blue-300 to-blue-400'>{children}</div>
  );
};

export default LeftSideMenu;
