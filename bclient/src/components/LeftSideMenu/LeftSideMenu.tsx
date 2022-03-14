import React from 'react';
import Logo from '../Logo/Logo';
import Calendar from '../Calendar/Calendar';
import Menu from '../Menu/Menu';
import MenuFooter from '../MenuFooter/MenuFooter';

const LeftSideMenu = () => {
  return (
    <div className='w-menu flex flex-col h-screen bg-my-blue-liter pt-14 px-9'>
      <Logo />
      <div className='flex-1 mt-8'>
        <Calendar />
        <Menu />
      </div>
      <MenuFooter />
    </div>
  );
};

export default LeftSideMenu;
