import React, { useRef, useState } from 'react';
import css from './Menu.module.css';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  href?: string;
};

const MenuItem = ({ title, href }: Props) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handlerRouter = (href) => async () => {
    await router.push(href);
  };
  const moveHandler = (event) => {
    setCoords({
      x: event.pageX - (buttonRef.current?.offsetLeft || 0),
      y: event.pageY - (buttonRef.current?.offsetTop || 0),
    });
  };

  return (
    <a
      ref={buttonRef}
      style={{ '--x': `${coords.x}px`, '--y': `${coords.y}px` } as React.CSSProperties}
      onMouseMove={moveHandler}
      onClick={handlerRouter(href)}
      className={`${css.button} cursor-pointer block bg-my-blue my-1.5 p-2 pl-4 border-0 rounded-2xl`}
    >
      <span className={'text-my-chrome'}>{title}</span>
    </a>
  );
};

export default MenuItem;
