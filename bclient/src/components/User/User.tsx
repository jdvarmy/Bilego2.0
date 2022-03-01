import React from 'react';
import Link from 'next/link';
import { userSelector } from '../../store/selectors';
import { useTypeSelector } from '../../hooks/useTypeSelector';

const User = () => {
  const { login } = useTypeSelector(userSelector);

  return !login ? (
    <div>
      <Link href={'/login'}>
        <a className='cursor-pointer'>login</a>
      </Link>
      /
      <Link href={'/register'}>
        <a className='cursor-pointer'>register</a>
      </Link>
    </div>
  ) : (
    <div>
      <Link href={'/user'}>
        <a className='cursor-pointer'>profile</a>
      </Link>
      /<a className='cursor-pointer'>logout</a>
    </div>
  );
};

export default User;
