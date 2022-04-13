import React from 'react';
import { GetServerSideProps } from 'next';
import { ThunkDispatchType, wrapper } from '../../src/store';
import { asyncGetTaxonomy } from '../../src/store/taxonomy/taxonomyThunk';

const About = () => {
  return <h1 className='text-h3 font-bold underline'>О нас</h1>;
};

export default About;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store): any => async () => {
  const dispatch = store.dispatch as ThunkDispatchType;

  try {
    await asyncGetTaxonomy(dispatch);
  } catch (e) {
    console.log('getServerSideProps about', e);
  }
});
