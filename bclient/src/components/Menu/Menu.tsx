import React from 'react';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
};

const Menu = ({ className }: Props) => {
  const router = useRouter();

  const handleRouter = (href) => async () => {
    await router.push(href);
  };

  return (
    <header className={className}>
      <ul>
        <li>
          <a onClick={handleRouter('/artists/vera-polozkova')} className='cursor-pointer'>
            artists
          </a>
        </li>
        <li>
          <a onClick={handleRouter('/events')} className='cursor-pointer'>
            events
          </a>
        </li>
        <li>
          <a onClick={handleRouter('/items')} className='cursor-pointer'>
            items
          </a>
        </li>
        <li>
          <a onClick={handleRouter('/news')} className='cursor-pointer'>
            news
          </a>
        </li>
        <li>
          <a onClick={handleRouter('/user')} className='cursor-pointer'>
            user
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Menu;
