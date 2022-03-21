import React from 'react';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
};

const Menu = ({ className }: Props) => {
  const router = useRouter();

  const handlerRouter = (href) => async () => {
    await router.push(href);
  };

  return (
    <header className={className}>
      <ul>
        <li>
          <a onClick={handlerRouter('/artists/vera-polozkova')} className='cursor-pointer'>
            artists
          </a>
        </li>
        <li>
          <a onClick={handlerRouter('/events')} className='cursor-pointer'>
            events
          </a>
        </li>
        <li>
          <a onClick={handlerRouter('/events/stereoleto')} className='cursor-pointer'>
            single event
          </a>
        </li>
        <li>
          <a onClick={handlerRouter('/items')} className='cursor-pointer'>
            items
          </a>
        </li>
        <li>
          <a onClick={handlerRouter('/news')} className='cursor-pointer'>
            news
          </a>
        </li>
        <li>
          <a onClick={handlerRouter('/user')} className='cursor-pointer'>
            user
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Menu;
