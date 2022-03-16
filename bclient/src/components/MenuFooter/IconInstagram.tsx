import React from 'react';
import { AMOUNT, useIconClickEffect } from '../../hooks/useIconClickEffect';
import { Particle } from '../Particle/Particle';

const Icon = ({ fill }: { fill?: string }) => {
  return (
    <svg width='28' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13.55 0H4.34999C2.43999 0 0.899994 1.54 0.899994 3.45V12.65C0.899994 14.56 2.43999 16.1 4.34999 16.1H13.55C15.46 16.1 17 14.56 17 12.65V3.45C17 1.54 15.45 0 13.55 0ZM8.94999 11.92C6.80999 11.92 5.07999 10.19 5.07999 8.05C5.07999 5.91 6.80999 4.18 8.94999 4.18C11.09 4.18 12.82 5.91 12.82 8.05C12.82 10.19 11.08 11.92 8.94999 11.92ZM14.19 4.64C13.39 4.64 12.74 3.99 12.74 3.19C12.74 2.39 13.39 1.74 14.19 1.74C14.99 1.74 15.64 2.39 15.64 3.19C15.64 4 14.99 4.64 14.19 4.64Z'
        fill={fill ?? '#7B7BAB'}
      />
    </svg>
  );
};

const IconInstagram = () => {
  const { show, coords, handlerClick } = useIconClickEffect();

  return (
    <span className='cursor-pointer' onClick={handlerClick}>
      <Icon />
      {Array(AMOUNT)
        .fill(1)
        .map((item, key) => (
          <Particle show={show} coords={coords} key={key}>
            <Icon fill={`hsl(${Math.random() * 50 + 348.66}, 75.23%, 57.25%)`} />
          </Particle>
        ))}
    </span>
  );
};

export default IconInstagram;
