import React from 'react';
import Link from 'next/link';
import { userSelector } from '../../store/selectors';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { UserCircleIcon } from '@heroicons/react/solid';

const User = () => {
  const { login } = useTypeSelector(userSelector);

  return !login ? (
    <div>
      <UserCircleIcon className='ml-3 w-12 h-12 fill-my-chrome cursor-pointer' />
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
