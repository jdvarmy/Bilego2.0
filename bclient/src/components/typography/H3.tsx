import React from 'react';

enum Color {
  chrome = 'text-chrome',
  turquoise = 'text-turquoise',
  purple = 'text-purple',
  raspberry = 'text-raspberry',
  white = 'text-white',
}

type Props = {
  children: string;
  className?: string;
  color?: Color;
};

const H3 = ({ children, className, color }: Props) => {
  return <div className={`text-h3 ${className} ${color || Color.turquoise}`}>{children}</div>;
};

export default H3;
