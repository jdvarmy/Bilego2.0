import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { setModePreference } from '../../../store/modePreference/modePreferenceSlice';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { preferenceModeSelector } from '../../../store/selectors';
import { useDispatch } from 'react-redux';

const PreferenceMode = () => {
  const dispatch = useDispatch();
  const { modePreferenceOn } = useTypeSelector(preferenceModeSelector);

  const clickHandler = () => {
    dispatch(setModePreference(!modePreferenceOn));
  };

  return (
    <div className='flex items-center w-36 cursor-pointer' onClick={clickHandler}>
      <HeartIcon className={`w-10 h-10 ml-3 stroke-1 stroke-chrome ${modePreferenceOn && 'fill-raspberry'}`} />
      <span className='text-xs ml-0.5 text-chrome'>режим предпочтений</span>
    </div>
  );
};

export default PreferenceMode;
