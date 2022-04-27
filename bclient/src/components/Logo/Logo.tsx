import React from 'react';
import { useRouter } from 'next/router';
import IconLogo from '../Icons/IconLogo';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { globalSelector } from '../../store/selectors';

const Logo = () => {
  const router = useRouter();
  const { city } = useTypeSelector(globalSelector);

  const handleRouter = (href) => async () => {
    await router.push(href);
  };

  return (
    <div className='flex-grow-0 flex-shrink-0 basis-auto'>
      <span onClick={handleRouter(`/${city}`)} className='cursor-pointer'>
        <IconLogo />
      </span>
    </div>
  );
};

export default Logo;
