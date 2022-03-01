import React from 'react';
import { useRouter } from 'next/router';

const Logo = () => {
  const router = useRouter();

  const handleRouter = (href) => async () => {
    await router.push(href);
  };

  return (
    <div className='flex-grow-0 flex-shrink-0 basis-auto'>
      <span onClick={handleRouter('/')} className='cursor-pointer'>
        Logo
      </span>
    </div>
  );
};

export default Logo;
