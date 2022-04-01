import React from 'react';
import { useRouter } from 'next/router';
import IconLogo from '../Icons/IconLogo';

const Logo = () => {
  const router = useRouter();

  const handlerRouter = (href) => async () => {
    await router.push(href);
  };

  return (
    <div className='flex-grow-0 flex-shrink-0 basis-auto'>
      <span onClick={handlerRouter('/')} className='cursor-pointer'>
        <IconLogo />
      </span>
    </div>
  );
};

export default Logo;
