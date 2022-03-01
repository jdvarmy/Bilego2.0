import React, { ReactNode } from 'react';
import Metadata from '../components/Metadata/Metadata';
import LeftSideMenu from '../components/LeftSideMenu/LeftSideMenu';
import RightSideContent from '../components/RightSideContent/RightSideContent';
import Calendar from '../components/Calendar/Calendar';
import Menu from '../components/Menu/Menu';
import MenuFooter from '../components/MenuFooter/MenuFooter';
import Logo from '../components/Logo/Logo';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Metadata />
      <div className='fixed flex overflow-hidden w-screen h-screen'>
        <LeftSideMenu>
          <Logo />
          <div className='flex-1'>
            <Calendar />
            <Menu />
          </div>
          <MenuFooter />
        </LeftSideMenu>
        <RightSideContent>{children}</RightSideContent>
      </div>
    </>
  );
};

export default Layout;
