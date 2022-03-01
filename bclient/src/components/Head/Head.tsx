import React from 'react';
import Search from '../Search/Search';
import User from '../User/User';

const Head = () => {
  return (
    <div className='flex justify-between'>
      <Search />
      <User />
    </div>
  );
};

export default Head;
