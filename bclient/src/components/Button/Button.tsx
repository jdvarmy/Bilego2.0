import Link from 'next/link';
import React, { ReactChild, useRef } from 'react';
import css from './Button.module.css';

type Props = {
  link?: string;
  children?: ReactChild;
  className?: string;
};

const Button = ({ link, children, className }: Props) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  const handlerClick = (event) => {
    const box = event.target.getBoundingClientRect();
    const x = event.pageX - box.left + window.pageYOffset - event.target.clientLeft;
    const y = event.pageY - box.top + window.pageYOffset - event.target.clientTop;

    const ripple = document.createElement('span');
    ripple.setAttribute('class', css.button);
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    buttonRef.current?.appendChild(ripple);

    const timeout = setTimeout(() => {
      ripple.remove();
      clearTimeout(timeout);
    }, 700);
  };

  const html = (
    <div
      onClick={handlerClick}
      ref={buttonRef}
      className={`${className} bg-raspberry-500 rounded-3xl px-16 py-2 cursor-pointer overflow-hidden`}
    >
      {children}
    </div>
  );

  return link ? <Link href={link}>{html}</Link> : html;
};

export default Button;
