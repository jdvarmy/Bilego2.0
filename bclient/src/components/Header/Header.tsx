import React from 'react';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const handleRouter = (href) => async () => {
    await router.push(href);
  };

  return (
    <ul>
      <li onClick={handleRouter('/artists/artis_one')}>
        <a>artists</a>
      </li>
      <li onClick={handleRouter('/events')}>
        <a>events</a>
      </li>
      <li onClick={handleRouter('/items')}>
        <a>items</a>
      </li>
      <li onClick={handleRouter('/news')}>
        <a>news</a>
      </li>
      <li onClick={handleRouter('/user')}>
        <a>user</a>
      </li>
    </ul>
  );
};

export default Header;
