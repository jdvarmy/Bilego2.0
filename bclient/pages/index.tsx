import React from 'react';
import Layout from '../src/layout/Layout';
import dynamic from 'next/dynamic';

// @ts-ignore
const AppTicket = dynamic(() => import('bticket/appTicket'), {
  ssr: false,
});

const Index = () => {
  return (
    <>
      <Layout>
        <h1 className='text-3xl font-bold underline'>MAIN PAGE</h1>
      </Layout>
      <AppTicket />
    </>
  );
};

export default Index;
