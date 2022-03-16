import React from 'react';
import { AMOUNT, useIconClickEffect } from '../../hooks/useIconClickEffect';
import { Particle } from '../Particle/Particle';

const Icon = ({ fill }: { fill?: string }) => {
  return (
    <svg width='28' height='16' viewBox='0 0 19 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0.659992 4.09999L16.81 0.139989C17.68 -0.0700105 18.57 0.74999 18.25 1.46999L13.03 15.39C12.71 16.09 11.53 16.04 11.07 15.31L8.01999 10.09C7.81999 9.75999 7.83999 9.38999 8.06999 9.12999L13.59 4.45999C14.11 3.98999 13.54 3.29999 12.76 3.69999L6.16999 7.76999C5.86999 7.92999 5.46999 7.93999 5.10999 7.77999L0.689992 5.80999C-0.220008 5.39999 -0.230008 4.31999 0.659992 4.09999Z'
        fill={fill ?? '#7B7BAB'}
      />
    </svg>
  );
};

const IconTelegram = () => {
  const { show, coords, handlerClick } = useIconClickEffect();

  return (
    <span className='cursor-pointer' onClick={handlerClick}>
      <Icon />
      {Array(AMOUNT)
        .fill(1)
        .map((item, key) => (
          <Particle show={show} coords={coords} key={key}>
            <Icon fill={`hsl(${Math.random() * 50 + 210}, 90.20%, 40.00%)`} />
          </Particle>
        ))}
    </span>
  );
};

export default IconTelegram;
