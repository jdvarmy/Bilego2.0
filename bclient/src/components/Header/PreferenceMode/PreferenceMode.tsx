import React from 'react';
import { setModePreference } from '../../../store/modePreference/modePreferenceSlice';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { preferenceModeSelector } from '../../../store/selectors';
import { useDispatch } from 'react-redux';
import StarIcon from '../../../styles/icons/StarIcon';
import QuestionIcon from '../../../styles/icons/QuestionIcon';

const PreferenceMode = () => {
  const dispatch = useDispatch();
  const { modePreferenceOn } = useTypeSelector(preferenceModeSelector);

  const clickHandler = () => {
    dispatch(setModePreference(!modePreferenceOn));
  };

  return (
    <div className='flex'>
      <div className='flex items-center w-36 cursor-pointer ml-6' onClick={clickHandler}>
        <StarIcon className={`w-10 h-10 stroke-1 stroke-chrome ${modePreferenceOn && 'fill-raspberry'}`} />
        <span className='text-xs ml-2 text-chrome'>режим предпочтений</span>
      </div>
      <QuestionIcon className='relative w-3 h-3 stroke-1 top-1' />
    </div>
  );
};

export default PreferenceMode;
