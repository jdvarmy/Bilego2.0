import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const LeftSideMenu = ({ children }: Props) => {
  return <div className='w-menu flex flex-col h-screen bg-my-blue-liter pt-14 px-9'>{children}</div>;
};

export default LeftSideMenu;
