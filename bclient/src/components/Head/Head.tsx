import React from 'react';
import Search from '../Search/Search';
import User from '../User/User';
import PreferenceMode from './PreferenceMode/PreferenceMode';
import City from './City/City';

const Head = () => {
  return (
    <div className='flex justify-between pt-4 pb-6 mt-2'>
      <div className='flex items-center justify-center'>
        <Search />
        <PreferenceMode />
      </div>
      <div className='flex items-center justify-center'>
        <City />
        <User />
      </div>
    </div>
  );
};

export default Head;
