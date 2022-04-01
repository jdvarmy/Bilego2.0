import React from 'react';
import Logo from '../Logo/Logo';
import Calendar from '../Calendar/Calendar';
import Menu from '../Menu/Menu';
import MenuFooter from '../MenuFooter/MenuFooter';

const LeftSideMenu = () => {
  return (
    <div className='fixed left-0 top-0 w-menu flex flex-col h-screen bg-blue-800 pt-9.5 px-8.5'>
      <Logo />
      <div className='flex-1'>
        <Calendar />
        <Menu />
      </div>
      <MenuFooter />
    </div>
  );
};

export default LeftSideMenu;
