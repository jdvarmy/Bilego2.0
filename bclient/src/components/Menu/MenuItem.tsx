import React, { useRef, useState } from 'react';
import css from './Menu.module.css';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

type Props = {
  title: string;
  href: UrlObject | string;
};

const MenuItem = ({ title, href }: Props) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const moveHandler = (event) => {
    setCoords({
      x: event.pageX - (buttonRef.current?.offsetLeft || 0),
      y: event.pageY - (buttonRef.current?.offsetTop || 0),
    });
  };
  const clickHandler = () => {
    router.push(href);
  };

  return (
    <a
      ref={buttonRef}
      style={{ '--x': `${coords.x}px`, '--y': `${coords.y}px` } as React.CSSProperties}
      onMouseMove={moveHandler}
      onClick={clickHandler}
      className={`${css.button} ${css.ripple} cursor-pointer block bg-blue-900 my-1.5 p-1.5 pl-4 border-0 rounded-2xl select-none`}
    >
      <span className='text-chrome'>{title}</span>
    </a>
  );
};

export default MenuItem;
