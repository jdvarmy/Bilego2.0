import React, { memo } from 'react';
import Link from 'next/link';
import IconTelegram from './IconTelegram';
import IconVk from './IconVk';
import IconInstagram from './IconInstagram';

const MenuFooter = () => {
  return (
    <div className='flex flex-col justify-end text-my-purple'>
      <div className='h-0 border-t border-my-purple' />
      <div className='my-4 grid grid-rows-2 grid-flow-col gap-0'>
        <div>
          <Link href={'/contacts'}>
            <a className='cursor-pointer'>контакты</a>
          </Link>
        </div>
        <div>
          <Link href={'/offer'}>
            <a className='cursor-pointer'>оферта</a>
          </Link>
        </div>
        <div>
          <Link href={'/items'}>
            <a className='cursor-pointer'>места</a>
          </Link>
        </div>
        <div>
          <Link href={'/about'}>
            <a className='cursor-pointer'>о нас</a>
          </Link>
        </div>
      </div>
      <div className='mb-3 flex flex-row justify-between'>
        <div>Bilego {new Date().getFullYear()}</div>
        <div className='flex flex-row items-center'>
          <IconTelegram />
          <IconVk />
          <IconInstagram />
        </div>
      </div>
    </div>
  );
};

export default memo(MenuFooter);
