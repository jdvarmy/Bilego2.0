import React, { ReactNode } from 'react';
import Metadata from '../components/Metadata/Metadata';
import LeftSideMenu from '../components/LeftSideMenu/LeftSideMenu';
import RightSideContent from '../components/RightSideContent/RightSideContent';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Metadata />
      <div className='flex w-screen h-screen'>
        <LeftSideMenu />
        <RightSideContent>{children}</RightSideContent>
      </div>
    </>
  );
};

export default Layout;
