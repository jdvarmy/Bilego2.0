import React from 'react';
import { useRouter } from 'next/router';
import css from './index.module.css';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { eventsSelector } from '../store/selectors';

const Index = () => {
  const router = useRouter();
  const { items } = useTypeSelector(eventsSelector);

  const handleRouter = (href) => () => {
    router.push(href);
  };

  return (
    <div>
      <ul className={css.ul}>
        <li onClick={handleRouter('/artists')}>
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
    </div>
  );
};

export default Index;
