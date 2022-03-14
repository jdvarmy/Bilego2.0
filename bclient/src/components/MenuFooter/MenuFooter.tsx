import React, { memo } from 'react';
import Link from 'next/link';

const MenuFooter = () => {
  console.log('FOOTER');

  return (
    <div className='flex flex-col justify-end text-my-purple'>
      <div className='h-0 border-t border-my-purple' />
      <div className='my-4'>
        <div className='flex flex-row my-1'>
          <Link href={'/contacts'}>
            <a className='cursor-pointer'>контакты</a>
          </Link>
          <Link href={'/items'}>
            <a className='cursor-pointer'>места</a>
          </Link>
        </div>
        <div className='flex flex-row my-1'>
          <Link href={'/offer'}>
            <a className='cursor-pointer'>оферта</a>
          </Link>
          <Link href={'/about'}>
            <a className='cursor-pointer'>о нас</a>
          </Link>
        </div>
      </div>
      <div className='mb-3'>Bilego {new Date().getFullYear()}</div>
    </div>
  );
};

export default memo(MenuFooter);
