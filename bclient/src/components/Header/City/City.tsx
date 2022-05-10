import React from 'react';
import LocationPointIcon from '../../../styles/icons/LocationPointIcon';
import { Cities } from '../../../types/enums';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { globalSelector } from '../../../store/selectors';

export const citiesI18n = {
  [Cities.moscow]: 'Москва',
  [Cities.petersburg]: 'Санкт-Петербург',
};

const City = () => {
  const { city } = useTypeSelector(globalSelector);

  const clickHandler = () => {};

  return (
    <div className='flex items-center cursor-pointer' onClick={clickHandler}>
      <span className='text-xs text-chrome'>{city ? citiesI18n[city] : 'empty'}</span>
      <LocationPointIcon className='ml-1 w-4 h-4 fill-raspberry' />
    </div>
  );
};

export default City;
