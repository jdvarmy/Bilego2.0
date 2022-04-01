import React from 'react';
import MenuItem from './MenuItem';

type Props = {
  className?: string;
};

type NavigationMenu = {
  title: string;
  href: string;
};

const menuItems: NavigationMenu[] = [
  { title: 'artists', href: '/artists/vera-polozkova' },
  { title: 'events', href: '/events' },
  { title: 'items', href: '/items' },
  { title: 'news', href: '/news' },
  { title: 'user', href: '/user' },
];

const Menu = ({ className }: Props) => {
  return (
    <nav className={`mt-14 ${className}`}>
      <div className='text-xl text-turquoise-500'>подборки</div>
      {menuItems.map((item) => (
        <MenuItem key={item.href} title={item.title} href={item.href} />
      ))}
    </nav>
  );
};

export default Menu;
