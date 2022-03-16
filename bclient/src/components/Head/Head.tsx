import React from 'react';
import Search from '../Search/Search';
import User from '../User/User';

const Head = () => {
  return (
    <div className='flex justify-between pt-4 pb-6'>
      <Search />
      <User />
    </div>
  );
};

export default Head;
