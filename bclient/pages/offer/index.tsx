import React from 'react';
import { GetServerSideProps } from 'next';
import { ThunkDispatchType, wrapper } from '../../src/store';
import { asyncGetTaxonomy } from '../../src/store/taxonomy/taxonomyThunk';

const Offer = () => {
  return (
    <>
      <h1 className='text-h3 font-bold underline'>Оферта</h1>
    </>
  );
};

export default Offer;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store): any => async () => {
  const dispatch = store.dispatch as ThunkDispatchType;

  try {
    await asyncGetTaxonomy(dispatch);
  } catch (e) {
    console.log('getServerSideProps offer', e);
  }
});
