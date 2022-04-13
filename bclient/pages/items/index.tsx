import React from 'react';
import { GetServerSideProps } from 'next';
import { ThunkDispatchType, wrapper } from '../../src/store';
import { asyncGetTaxonomy } from '../../src/store/taxonomy/taxonomyThunk';

const Items = () => {
  return <h1 className='text-h3 font-bold underline'>Items</h1>;
};

export default Items;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store): any => async () => {
  const dispatch = store.dispatch as ThunkDispatchType;

  try {
    await asyncGetTaxonomy(dispatch);
  } catch (e) {
    console.log('getServerSideProps items', e);
  }
});
